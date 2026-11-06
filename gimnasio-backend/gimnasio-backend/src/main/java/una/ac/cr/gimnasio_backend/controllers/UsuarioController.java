package una.ac.cr.gimnasio_backend.controllers;

import jakarta.servlet.http.HttpSession;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import una.ac.cr.gimnasio_backend.models.Usuario;
import una.ac.cr.gimnasio_backend.services.UsuarioService;
import java.util.Map;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {
 private final UsuarioService usuarios;
 public UsuarioController(UsuarioService u){usuarios=u;}
 private Map<String,Object> vista(Usuario u){return Map.of("id",u.getId(),"username",u.getUsername(),"rol",u.getRol());}
 @PostMapping("/login")
 public ResponseEntity<?> login(@RequestBody Usuario request,HttpServletRequest requestHttp){
  if(request.getUsername()==null||request.getPasswordHash()==null)throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Indique usuario y contraseña.");
  try {
   Usuario autenticado=usuarios.autenticar(request.getUsername(),request.getPasswordHash());
   HttpSession previa=requestHttp.getSession(false);
   if(previa!=null)previa.invalidate();
   HttpSession nueva=requestHttp.getSession(true);
   // No mutar entidades JPA administradas: conservar solamente el perfil seguro en la sesión.
   Usuario perfil=new Usuario();perfil.setId(autenticado.getId());perfil.setUsername(autenticado.getUsername());perfil.setRol(autenticado.getRol());perfil.setPasswordHash("NA");
   nueva.setAttribute("usuarioLogueado",perfil);
   return ResponseEntity.ok(vista(perfil));
  }catch(RuntimeException ex){throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Credenciales inválidas.");}
 }
 @PostMapping
 public ResponseEntity<?> crearUsuario(@Valid @RequestBody Usuario nuevoUsuario,HttpSession session){
  Usuario actual=(Usuario)session.getAttribute("usuarioLogueado");
  if(actual==null)throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Inicie sesión.");
  if(!"ADMIN".equals(actual.getRol()))throw new ResponseStatusException(HttpStatus.FORBIDDEN,"Solo administrador.");
  Usuario creado=usuarios.registrarUsuario(nuevoUsuario);
  return ResponseEntity.status(HttpStatus.CREATED).body(vista(creado));
 }
 @PostMapping("/logout")
 public ResponseEntity<?> logout(HttpSession session){session.invalidate();return ResponseEntity.ok(Map.of("mensaje","Sesión cerrada."));}
 @GetMapping("/sesion")
 public ResponseEntity<?> sesion(HttpSession s){Usuario u=(Usuario)s.getAttribute("usuarioLogueado");if(u==null)throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"No hay sesión activa.");return ResponseEntity.ok(vista(u));}
}
