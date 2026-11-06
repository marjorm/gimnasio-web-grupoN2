package una.ac.cr.gimnasio_backend.controllers;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import org.springframework.http.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import una.ac.cr.gimnasio_backend.models.Usuario;
import una.ac.cr.gimnasio_backend.repositories.UsuarioRepository;
import java.util.*;
@RestController @RequestMapping("/api/admin/usuarios")
public class UsuariosAdminController {
 private final UsuarioRepository repo;private final BCryptPasswordEncoder encoder;
 public UsuariosAdminController(UsuarioRepository r,BCryptPasswordEncoder e){repo=r;encoder=e;}
 public record UsuarioVista(Integer id,String username,String rol){}
 public record Cuenta(@NotNull @Positive Integer id,@NotBlank String username,@NotBlank String rol,@NotBlank String password){}
 public record Modificar(@NotBlank String username,@NotBlank String rol,String password){}
 private void admin(HttpSession s){Usuario u=(Usuario)s.getAttribute("usuarioLogueado");if(u==null)throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);if(!"ADMIN".equals(u.getRol()))throw new ResponseStatusException(HttpStatus.FORBIDDEN);}
 private String rol(String r){if(!List.of("ADMIN","INSTRUCTOR","CLIENTE").contains(r))throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Rol inválido.");return r;}
 private UsuarioVista vista(Usuario u){return new UsuarioVista(u.getId(),u.getUsername(),u.getRol());}
 @GetMapping public List<UsuarioVista> todos(HttpSession s){admin(s);return repo.findAll().stream().map(this::vista).toList();}
 @PostMapping @Transactional public ResponseEntity<UsuarioVista> crear(@Valid @RequestBody Cuenta c,HttpSession s){admin(s);if(c.password().length()<8)throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Contraseña: mínimo 8 caracteres.");if(repo.existsById(c.id())||repo.findByUsername(c.username()).isPresent())throw new ResponseStatusException(HttpStatus.CONFLICT,"Usuario duplicado.");Usuario u=new Usuario();u.setId(c.id());u.setUsername(c.username());u.setRol(rol(c.rol()));u.setPasswordHash(encoder.encode(c.password()));return ResponseEntity.status(201).body(vista(repo.save(u)));}
 @PutMapping("/{id}") @Transactional public UsuarioVista editar(@PathVariable Integer id,@Valid @RequestBody Modificar d,HttpSession s){admin(s);Usuario u=repo.findById(id).orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND));if(repo.findByUsername(d.username()).filter(otro->!otro.getId().equals(id)).isPresent())throw new ResponseStatusException(HttpStatus.CONFLICT,"Usuario duplicado.");u.setUsername(d.username());u.setRol(rol(d.rol()));if(d.password()!=null&&!d.password().isBlank()){if(d.password().length()<8)throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Contraseña corta.");u.setPasswordHash(encoder.encode(d.password()));}return vista(repo.save(u));}
 @DeleteMapping("/{id}") public ResponseEntity<Void> eliminar(@PathVariable Integer id,HttpSession s){admin(s);Usuario logged=(Usuario)s.getAttribute("usuarioLogueado");if(logged.getId().equals(id))throw new ResponseStatusException(HttpStatus.CONFLICT,"No puede eliminar su propia cuenta.");if(!repo.existsById(id))throw new ResponseStatusException(HttpStatus.NOT_FOUND);repo.deleteById(id);return ResponseEntity.noContent().build();}
}
