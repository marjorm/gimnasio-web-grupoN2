package una.ac.cr.gimnasio_backend.controllers;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import una.ac.cr.gimnasio_backend.models.*;
import una.ac.cr.gimnasio_backend.repositories.*;
import java.util.*;
@RestController @RequestMapping("/api/historial-cursos")
public class HistorialCursoController {
 private final HistorialCursoRepository historial;
 private final ClienteRepository clientes;private final InstructorRepository instructores;private final CursoRepository cursos;
 public HistorialCursoController(HistorialCursoRepository h,ClienteRepository cl,InstructorRepository in,CursoRepository cu){historial=h;clientes=cl;instructores=in;cursos=cu;}
 private void autorizar(HttpSession s){Usuario u=(Usuario)s.getAttribute("usuarioLogueado");if(u==null)throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);if(!"ADMIN".equals(u.getRol())&&!"INSTRUCTOR".equals(u.getRol()))throw new ResponseStatusException(HttpStatus.FORBIDDEN);}
 private void validar(HistorialCurso h){if(!clientes.existsById(h.getClienteId())||!instructores.existsById(h.getInstructorId())||!cursos.existsById(h.getCursoId()))throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Cliente, instructor o curso inexistente.");}
 @GetMapping public List<HistorialCurso> todos(HttpSession s){autorizar(s);return historial.findAll();}
 @GetMapping("/{id}") public HistorialCurso uno(@PathVariable Integer id,HttpSession s){autorizar(s);return historial.findById(id).orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND));}
 @PostMapping public ResponseEntity<HistorialCurso> crear(@Valid @RequestBody HistorialCurso h,HttpSession s){autorizar(s);if(historial.existsById(h.getId()))throw new ResponseStatusException(HttpStatus.CONFLICT,"El historial ya existe.");validar(h);return ResponseEntity.status(201).body(historial.save(h));}
 @PutMapping("/{id}") public HistorialCurso editar(@PathVariable Integer id,@Valid @RequestBody HistorialCurso h,HttpSession s){autorizar(s);if(!id.equals(h.getId()))throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"No se permite modificar la clave primaria.");HistorialCurso actual=historial.findById(id).orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND));if(!actual.getClienteId().equals(h.getClienteId())||!actual.getInstructorId().equals(h.getInstructorId())||!actual.getCursoId().equals(h.getCursoId()))throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"No se permite modificar llaves foráneas.");actual.setFecha(h.getFecha());actual.setHoras(h.getHoras());return historial.save(actual);}
 @DeleteMapping("/{id}") public ResponseEntity<Void> borrar(@PathVariable Integer id,HttpSession s){autorizar(s);if(!historial.existsById(id))throw new ResponseStatusException(HttpStatus.NOT_FOUND);historial.deleteById(id);return ResponseEntity.noContent().build();}
}
