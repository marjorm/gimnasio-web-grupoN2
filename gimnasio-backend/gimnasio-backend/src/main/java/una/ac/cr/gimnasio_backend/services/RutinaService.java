package una.ac.cr.gimnasio_backend.services;

import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import una.ac.cr.gimnasio_backend.models.*;
import una.ac.cr.gimnasio_backend.repositories.*;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Service @Scope("singleton")
public class RutinaService {
 private final RutinaRepository rutinas;
 private final ClienteRepository clientes;
 private final InstructorRepository instructores;
 private final MaquinaRepository maquinas;
 public RutinaService(RutinaRepository r,ClienteRepository c,InstructorRepository i,MaquinaRepository m){rutinas=r;clientes=c;instructores=i;maquinas=m;}
 @Transactional(readOnly=true) public List<Rutina> listar(){
  List<Rutina> lista=new ArrayList<>();Iterator<Rutina> it=rutinas.findAll().iterator();
  while(it.hasNext())lista.add(it.next());return lista;
 }
 @Transactional(readOnly=true) public List<Rutina> ObteberRutinasPorClienteId(Integer id){return rutinas.findRutinasByCliente_Id(id);}
 @Transactional(readOnly=true) public Rutina obtener(Integer id){return rutinas.findById(id).orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND,"Rutina no encontrada."));}
 @Transactional public Rutina crear(RutinaRequest d){
  if(rutinas.existsById(d.getId()))throw new ResponseStatusException(HttpStatus.CONFLICT,"La rutina ya existe.");
  return rutinas.save(mapear(new Rutina(),d));
 }
 @Transactional public Rutina actualizar(Integer id,RutinaRequest d){
  Rutina original=obtener(id);
  if(!id.equals(d.getId()))throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"No puede cambiar la llave primaria.");
  if(!original.getCliente().getId().equals(d.getClienteId())||
     !original.getInstructor().getId().equals(d.getInstructorId())||
     !original.getMaquina().equals(d.getMaquina())){
   throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"No se permite modificar llaves foráneas.");
  }
  original.setFecha_Rutina(d.getFecha());original.setHoras(d.getHoras());return rutinas.save(original);
 }
 @Transactional public void eliminar(Integer id){rutinas.delete(obtener(id));}
 private Rutina mapear(Rutina r,RutinaRequest d){
  if(!maquinas.existsById(d.getMaquina()))throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Máquina inexistente.");
  r.setId(d.getId());
  r.setCliente(clientes.findById(d.getClienteId()).orElseThrow(()->new ResponseStatusException(HttpStatus.BAD_REQUEST,"Cliente inexistente.")));
  r.setInstructor(instructores.findById(d.getInstructorId()).orElseThrow(()->new ResponseStatusException(HttpStatus.BAD_REQUEST,"Instructor inexistente.")));
  r.setMaquina(d.getMaquina());r.setFecha_Rutina(d.getFecha());r.setHoras(d.getHoras());return r;
 }
}
