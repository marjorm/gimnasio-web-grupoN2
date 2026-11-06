package una.ac.cr.gimnasio_backend.controllers;
import jakarta.validation.Valid;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import una.ac.cr.gimnasio_backend.models.Cliente;
import una.ac.cr.gimnasio_backend.services.RegistroClienteService;
@RestController @RequestMapping("/api/registro-clientes")
public class RegistroClienteController {
 private final RegistroClienteService servicio;
 public RegistroClienteController(RegistroClienteService s){servicio=s;}
 @PostMapping public ResponseEntity<Cliente> crear(@Valid @RequestBody RegistroClienteService.DatosRegistro d){return ResponseEntity.status(201).body(servicio.registrar(d));}
}
