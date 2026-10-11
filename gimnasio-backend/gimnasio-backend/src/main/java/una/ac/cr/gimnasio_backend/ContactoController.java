package una.ac.cr.gimnasio_backend;

import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import una.ac.cr.gimnasio_backend.models.ContactoRequest;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ContactoController {
	private static final Logger log = LoggerFactory.getLogger(ContactoController.class);

	@PostMapping("/contacto")
	public Map<String, String> recibirContacto(@Valid @RequestBody ContactoRequest datos) {
		log.info("Consulta recibida de: {} ({})", datos.getNombre(), datos.getCorreo());
		return Map.of("status", "ok", "mensaje", "Su consulta fue recibida correctamente.");
	}

	@PostMapping("/inscripcion")
	@ResponseStatus(HttpStatus.GONE)
	public Map<String, String> recibirInscripcion() {
		throw new ResponseStatusException(HttpStatus.GONE, "Use POST /api/clientes para registrar una inscripción de cliente.");
	}
}