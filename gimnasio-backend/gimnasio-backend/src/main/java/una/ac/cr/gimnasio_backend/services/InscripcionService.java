package una.ac.cr.gimnasio_backend.services;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import una.ac.cr.gimnasio_backend.models.*;
import una.ac.cr.gimnasio_backend.repositories.*;
import java.time.*;
import java.util.*;

@Service
public class InscripcionService {
 private final InscripcionRepository inscripciones;
 private final ClienteRepository clientes;
 private final CursoRepository cursos;
 private final RutinaRepository rutinas;
 private final PagoRepository pagos;
 private final BajaGimnasioRepository bajas;
 private final CursoDetalleRepository detalles;
 public InscripcionService(InscripcionRepository i,ClienteRepository c,CursoRepository cs,RutinaRepository r,PagoRepository p,BajaGimnasioRepository b,CursoDetalleRepository d){
   inscripciones=i;clientes=c;cursos=cs;rutinas=r;pagos=p;bajas=b;detalles=d;
 }
 @Transactional(readOnly=true)
 public List<Inscripcion> mias(Integer clienteId){return inscripciones.findByClienteIdOrderByFechaRegistroDesc(clienteId);}
 @Transactional(readOnly=true)
 public List<Inscripcion> todas(){return inscripciones.findAll();}
 @Transactional(readOnly=true)
 public boolean alDia(Integer clienteId){return !pagos.existsByClienteIdAndEstadoAndFechaVencimientoLessThanEqual(clienteId,"PENDIENTE",LocalDate.now());}
 @Transactional
 public Inscripcion registrar(Integer clienteId,String tipo,Integer itemId){
   if(clienteId==null||itemId==null||itemId<=0)throw error(HttpStatus.BAD_REQUEST,"Indique cliente e inscripción válidos.");
   if(!clientes.existsById(clienteId))throw error(HttpStatus.BAD_REQUEST,"El cliente no existe.");
   if(bajas.existsByClienteId(clienteId))throw error(HttpStatus.CONFLICT,"El cliente fue dado de baja; consulte al administrador.");
   if(!"CURSO".equals(tipo)&&!"RUTINA".equals(tipo))throw error(HttpStatus.BAD_REQUEST,"Tipo inválido.");
   if("CURSO".equals(tipo)) {
     if(!cursos.existsById(itemId))throw error(HttpStatus.BAD_REQUEST,"El curso no existe.");
     // El lock serializa inscripciones que compiten por el ultimo cupo.
     CursoDetalle d=detalles.bloquearParaInscripcion(itemId)
         .orElseThrow(()->error(HttpStatus.CONFLICT,"Este curso aun no tiene horario y cupos configurados."));
     if(d.getCupos()==null||d.getCupos()<=0||d.getHorario()==null||
         d.getHorario().isBlank()||d.getHorario().toLowerCase(Locale.ROOT).contains("pendiente"))
         throw error(HttpStatus.CONFLICT,"Este curso no tiene cupos u horario disponible.");
     long ocupados=inscripciones.countByTipoAndItemIdAndEstado("CURSO",itemId,"ACTIVA");
     if(ocupados>=d.getCupos())throw error(HttpStatus.CONFLICT,"No quedan cupos disponibles para este curso.");
   }
   if("RUTINA".equals(tipo)){
     Rutina r=rutinas.findById(itemId).orElseThrow(()->error(HttpStatus.BAD_REQUEST,"La rutina no existe."));
     if(r.getCliente()==null||!clienteId.equals(r.getCliente().getId()))throw error(HttpStatus.FORBIDDEN,"La rutina no está asignada a este cliente.");
   }
   if(inscripciones.existsByClienteIdAndTipoAndItemIdAndEstado(clienteId,tipo,itemId,"ACTIVA"))throw error(HttpStatus.CONFLICT,"Esta inscripción ya existe.");
   Inscripcion i=new Inscripcion();i.setClienteId(clienteId);i.setTipo(tipo);i.setItemId(itemId);
   return inscripciones.save(i);
 }
 @Transactional
 public Inscripcion cancelar(Long id,Integer clienteId,boolean admin){
   Inscripcion i=inscripciones.findById(id).orElseThrow(()->error(HttpStatus.NOT_FOUND,"Inscripción no encontrada."));
   if(!admin&&!i.getClienteId().equals(clienteId))throw error(HttpStatus.FORBIDDEN,"No puede cancelar inscripciones ajenas.");
   if(!"ACTIVA".equals(i.getEstado()))throw error(HttpStatus.CONFLICT,"La inscripción ya está cancelada.");
   if(!alDia(i.getClienteId()))throw error(HttpStatus.CONFLICT,"Existen pagos vencidos pendientes.");
   i.setEstado("CANCELADA");i.setFechaCancelacion(LocalDateTime.now());return inscripciones.save(i);
 }
 @Transactional
 public BajaGimnasio baja(Integer clienteId){
   if(!clientes.existsById(clienteId))throw error(HttpStatus.NOT_FOUND,"Cliente no encontrado.");
   if(bajas.existsByClienteId(clienteId))throw error(HttpStatus.CONFLICT,"La baja ya fue registrada.");
   if(!alDia(clienteId))throw error(HttpStatus.CONFLICT,"No puede desinscribirse: tiene pagos vencidos.");
   for(Inscripcion i:inscripciones.findByClienteIdAndEstado(clienteId,"ACTIVA")){
       i.setEstado("CANCELADA");i.setFechaCancelacion(LocalDateTime.now());inscripciones.save(i);
   }
   BajaGimnasio b=new BajaGimnasio();b.setClienteId(clienteId);return bajas.save(b);
 }
 private ResponseStatusException error(HttpStatus h,String m){return new ResponseStatusException(h,m);}
}
