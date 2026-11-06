package una.ac.cr.gimnasio_backend.controllers;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import una.ac.cr.gimnasio_backend.models.*;
import una.ac.cr.gimnasio_backend.repositories.*;
import java.time.LocalDate;
import java.util.*;
@RestController @RequestMapping("/api/pagos")
public class PagosController {
 private final PagoRepository pagos;
 private final ClienteRepository clientes;
 public PagosController(PagoRepository p,ClienteRepository c){pagos=p;clientes=c;}
 private Usuario user(HttpSession s){Usuario u=(Usuario)s.getAttribute("usuarioLogueado");if(u==null)throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);return u;}
 private void admin(HttpSession s){if(!"ADMIN".equals(user(s).getRol()))throw new ResponseStatusException(HttpStatus.FORBIDDEN);}
 @GetMapping public List<Pago> todos(HttpSession s){admin(s);return pagos.findAll();}
 @GetMapping("/mios") public List<Pago> mios(HttpSession s){Usuario u=user(s);if(!"CLIENTE".equals(u.getRol()))throw new ResponseStatusException(HttpStatus.FORBIDDEN);return pagos.findByClienteIdOrderByFechaVencimientoDesc(u.getId());}
 @PostMapping public ResponseEntity<Pago> crear(@Valid @RequestBody Pago p,HttpSession s){admin(s);if(!clientes.existsById(p.getClienteId()))throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Cliente inexistente.");p.setId(null);if("PAGADO".equals(p.getEstado())&&p.getFechaPago()==null)p.setFechaPago(LocalDate.now());return ResponseEntity.status(201).body(pagos.save(p));}
 @PutMapping("/{id}/pagar") public Pago pagar(@PathVariable Long id,HttpSession s){admin(s);Pago p=pagos.findById(id).orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND));p.setEstado("PAGADO");p.setFechaPago(LocalDate.now());return pagos.save(p);}
 @DeleteMapping("/{id}") public ResponseEntity<Void> eliminar(@PathVariable Long id,HttpSession s){admin(s);if(!pagos.existsById(id))throw new ResponseStatusException(HttpStatus.NOT_FOUND);pagos.deleteById(id);return ResponseEntity.noContent().build();}
}
