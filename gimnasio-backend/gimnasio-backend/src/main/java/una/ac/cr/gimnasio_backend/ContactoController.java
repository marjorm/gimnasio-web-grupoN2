package una.ac.cr.gimnasio_backend;

import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class ContactoController {

	@PostMapping("/contacto")
	public Map<String, String> recibirContacto(@RequestBody Map<String, String> datos) {
		System.out.println("Consulta recibida de: " + datos.get("nombre"));
		return Map.of(
				"status", "ok",
				"mensaje", "Su consulta fue recibida correctamente"
		);
	}

	@PostMapping("/inscripcion")
	public Map<String, String> recibirInscripcion(@RequestBody Map<String, String> datos) {
		System.out.println("Inscripción recibida de: " + datos.get("nombre"));
		return Map.of(
				"status", "ok",
				"mensaje", "Inscripción registrada correctamente"
		);
	}

	@GetMapping("/cursos")
	public Object listarCursos() {
		return new Object[] {
				Map.of("id", 1, "nombre", "Spinning", "horario", "Lunes y Miércoles 6:00 pm"),
				Map.of("id", 2, "nombre", "Yoga", "horario", "Martes y Jueves 7:00 am"),
				Map.of("id", 3, "nombre", "CrossFit", "horario", "Lunes a Viernes 5:00 pm")
		};
	}
}