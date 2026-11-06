package una.ac.cr.gimnasio_backend.controllers;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import una.ac.cr.gimnasio_backend.models.*;
import una.ac.cr.gimnasio_backend.repositories.*;
import java.util.*;
@RestController @RequestMapping("/api/cursos-detalle")
public class CursoDetalleController {
 private final CursoDetalleRepository detalle;private final CursoRepository cursos;private final InscripcionRepository inscripciones;
 public CursoDetalleController(CursoDetalleRepository d,CursoRepository c,InscripcionRepository i){detalle=d;cursos=c;inscripciones=i;}
 @GetMapping public List<CursoDetalle> todos(){return detalle.findAll();}
 public record Disponibilidad(Integer cursoId,String horario,Integer cupos,long cuposDisponibles,String imagen){}
 @GetMapping("/disponibilidad") public List<Disponibilidad> disponibilidad(){
  return detalle.findAll().stream().map(d->{
    long ocupados=inscripciones.countByTipoAndItemIdAndEstado("CURSO",d.getCursoId(),"ACTIVA");
    long libres=Math.max(0L,(long)d.getCupos()-ocupados);
    return new Disponibilidad(d.getCursoId(),d.getHorario(),d.getCupos(),libres,d.getImagen());
  }).toList();
 }
 @PutMapping("/{id}") public CursoDetalle actualizar(@PathVariable Integer id,@Valid @RequestBody CursoDetalle d,HttpSession s){Usuario u=(Usuario)s.getAttribute("usuarioLogueado");if(u==null)throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);if(!"ADMIN".equals(u.getRol())&&!"INSTRUCTOR".equals(u.getRol()))throw new ResponseStatusException(HttpStatus.FORBIDDEN);if(!id.equals(d.getCursoId()))throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"No cambie el ID.");if(!cursos.existsById(id))throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Curso no encontrado.");long ocupados=inscripciones.countByTipoAndItemIdAndEstado("CURSO",id,"ACTIVA");
  if(d.getCupos()<ocupados)throw new ResponseStatusException(HttpStatus.CONFLICT,"El cupo no puede ser menor que las inscripciones activas.");
  return detalle.save(d);}
 @DeleteMapping("/{id}") public ResponseEntity<Void> eliminar(@PathVariable Integer id,HttpSession s){
  Usuario u=(Usuario)s.getAttribute("usuarioLogueado");
  if(u==null)throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
  if(!"ADMIN".equals(u.getRol())&&!"INSTRUCTOR".equals(u.getRol()))throw new ResponseStatusException(HttpStatus.FORBIDDEN);
  if(!detalle.existsById(id))throw new ResponseStatusException(HttpStatus.NOT_FOUND);
  long activos=inscripciones.countByTipoAndItemIdAndEstado("CURSO",id,"ACTIVA");
  if(activos>0)throw new ResponseStatusException(HttpStatus.CONFLICT,"No puede eliminar una programación con inscripciones activas.");
  detalle.deleteById(id);return ResponseEntity.noContent().build();
 }

}
