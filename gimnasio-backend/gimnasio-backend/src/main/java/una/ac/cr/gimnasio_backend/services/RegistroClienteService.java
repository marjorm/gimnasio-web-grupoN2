package una.ac.cr.gimnasio_backend.services;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import jakarta.validation.Validator;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import una.ac.cr.gimnasio_backend.models.*;
import una.ac.cr.gimnasio_backend.repositories.*;
import java.util.*;
@Service
public class RegistroClienteService {
 private final ClienteRepository clientes;private final UsuarioRepository usuarios;
 private final BCryptPasswordEncoder encoder;private final Validator validator;
 public RegistroClienteService(ClienteRepository c,UsuarioRepository u,BCryptPasswordEncoder e,Validator v){clientes=c;usuarios=u;encoder=e;validator=v;}
 public record DatosRegistro(@NotNull @Valid Cliente cliente,@NotBlank @Size(min=3,max=50) String username,@NotBlank @Size(min=8,max=72) String password){}
 @Transactional
 public Cliente registrar(DatosRegistro d){
  Cliente cliente=d.cliente();
  if(cliente.getId()==null||cliente.getId()<=0)throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Cédula inválida.");
  if(!validator.validate(cliente).isEmpty())throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Datos personales inválidos.");
  if(clientes.existsById(cliente.getId())||usuarios.existsById(cliente.getId())||usuarios.findByUsername(d.username()).isPresent())throw new ResponseStatusException(HttpStatus.CONFLICT,"Cédula o usuario existente.");
  Usuario u=new Usuario();u.setId(cliente.getId());u.setRol("CLIENTE");u.setUsername(d.username());u.setPasswordHash(encoder.encode(d.password()));
  usuarios.save(u);return clientes.save(cliente);
 }
}
