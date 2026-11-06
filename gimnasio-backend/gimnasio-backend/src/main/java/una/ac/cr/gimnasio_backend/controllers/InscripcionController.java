package una.ac.cr.gimnasio_backend.controllers;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import una.ac.cr.gimnasio_backend.models.*;
import una.ac.cr.gimnasio_backend.services.InscripcionService;
import java.util.*;
@RestController @RequestMapping("/api/inscripciones")
public class InscripcionController {
 private final InscripcionService servicio;
 public InscripcionController(InscripcionService s){servicio=s;}
 public record Solicitud(@NotBlank String tipo,@NotNull @Positive Integer itemId,Integer clienteId){}
 private Usuario sesion(HttpSession s){
  Usuario u=(Usuario)s.getAttribute("usuarioLogueado");
  if(u==null)throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Inicie sesión.");return u;
 }
 private boolean admin(Usuario u){return "ADMIN".equals(u.getRol());}
 @GetMapping("/mias") public List<Inscripcion> mias(HttpSession s){
  Usuario u=sesion(s); if(!"CLIENTE".equals(u.getRol()))throw new ResponseStatusException(HttpStatus.FORBIDDEN,"Solo clientes.");
  return servicio.mias(u.getId());
 }
 @GetMapping public List<Inscripcion> listar(HttpSession s){
  Usuario u=sesion(s);if(!admin(u))throw new ResponseStatusException(HttpStatus.FORBIDDEN,"Solo administrador.");return servicio.todas();
 }
 @GetMapping("/al-dia") public Map<String,Boolean> alDia(HttpSession s){Usuario u=sesion(s);if(!"CLIENTE".equals(u.getRol()))throw new ResponseStatusException(HttpStatus.FORBIDDEN);return Map.of("alDia",servicio.alDia(u.getId()));}
 @PostMapping public ResponseEntity<Inscripcion> registrar(@Valid @RequestBody Solicitud dto,HttpSession s){
  Usuario u=sesion(s);
  if(!"CLIENTE".equals(u.getRol())&&!admin(u))throw new ResponseStatusException(HttpStatus.FORBIDDEN);
  Integer clienteId=admin(u)?dto.clienteId():u.getId();
  if(clienteId==null)throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Indique el cliente.");
  return ResponseEntity.status(201).body(servicio.registrar(clienteId,dto.tipo().trim().toUpperCase(Locale.ROOT),dto.itemId()));
 }
 @PostMapping("/{id}/cancelar") public Inscripcion cancelar(@PathVariable Long id,HttpSession s){Usuario u=sesion(s);if(!"CLIENTE".equals(u.getRol())&&!admin(u))throw new ResponseStatusException(HttpStatus.FORBIDDEN);return servicio.cancelar(id,u.getId(),admin(u));}
 @PostMapping("/baja-gimnasio") public BajaGimnasio baja(HttpSession s){Usuario u=sesion(s);if(!"CLIENTE".equals(u.getRol()))throw new ResponseStatusException(HttpStatus.FORBIDDEN);return servicio.baja(u.getId());}
}
