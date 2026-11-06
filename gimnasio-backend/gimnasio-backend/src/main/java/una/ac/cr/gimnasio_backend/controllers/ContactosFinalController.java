package una.ac.cr.gimnasio_backend.controllers;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import una.ac.cr.gimnasio_backend.models.*;
import una.ac.cr.gimnasio_backend.repositories.*;
import java.util.*;
@RestController @RequestMapping("/api/contactos")
public class ContactosFinalController {
 private final ConsultaContactoRepository contactos;
 public ContactosFinalController(ConsultaContactoRepository c){contactos=c;}
 private void admin(HttpSession s){Usuario u=(Usuario)s.getAttribute("usuarioLogueado");if(u==null)throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);if(!"ADMIN".equals(u.getRol()))throw new ResponseStatusException(HttpStatus.FORBIDDEN);}
 @PostMapping public ResponseEntity<Map<String,Object>> recibir(@Valid @RequestBody ConsultaContacto c){c.setId(null);c.setEstado("NUEVA");contactos.save(c);return ResponseEntity.status(201).body(Map.of("mensaje","Consulta registrada correctamente.","id",c.getId()));}
 @GetMapping public List<ConsultaContacto> listar(HttpSession s){admin(s);return contactos.findAll();}
 @PutMapping("/{id}/atender") public ConsultaContacto atender(@PathVariable Long id,HttpSession s){admin(s);ConsultaContacto c=contactos.findById(id).orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND));c.setEstado("ATENDIDA");return contactos.save(c);}
}
