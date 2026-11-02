package una.ac.cr.gimnasio_backend.controllers;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import una.ac.cr.gimnasio_backend.models.Rutina;
import una.ac.cr.gimnasio_backend.models.RutinaRequest;
import una.ac.cr.gimnasio_backend.models.Usuario;
import una.ac.cr.gimnasio_backend.services.RutinaService;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/rutinas")
public class RutinaController {
    private final RutinaService service;

    public RutinaController(RutinaService service) {
        this.service = service;
    }

    @GetMapping("/mis-rutinas")
    public ResponseEntity<?> obtenerMisRutinas(HttpSession session) {
        Usuario usuarioLogueado = (Usuario) session.getAttribute("usuarioLogueado");

        if (usuarioLogueado == null) {
            return ResponseEntity.status(401).body("No autorizado. Debe iniciar sesión.");
        }

        //Que sea estrictamente un cliente
        if (!"CLIENTE".equals(usuarioLogueado.getRol())) { return ResponseEntity.status(403).build(); }

        List<Rutina> rutinas = service.ObteberRutinasPorClienteId(usuarioLogueado.getId());

        return ResponseEntity.ok(rutinas);
    }

    @GetMapping
    public List<Rutina> listar(HttpSession session) {
        Usuario usuarioLogueado = (Usuario) session.getAttribute("usuarioLogueado");

        if ( usuarioLogueado == null || !usuarioLogueado.getRol().equals("INSTRUCTOR")) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "No autorizado. Debe iniciar sesión.");
        }
        return service.listar();
    }

    @GetMapping("/{id}")
    public Rutina obtener(@PathVariable Integer id, HttpSession session) {
        validarInstructor(session);
        return service.obtener(id);
    }

    @PostMapping
    public ResponseEntity<Rutina> crear(@Valid @RequestBody RutinaRequest dto, HttpSession session) {
        validarInstructor(session);
        return ResponseEntity.status(HttpStatus.CREATED).body(service.crear(dto));
    }

    @PutMapping("/{id}")
    public Rutina actualizar(@PathVariable Integer id, @Valid @RequestBody RutinaRequest dto, HttpSession session) {
        validarInstructor(session);
        return service.actualizar(id, dto);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id, HttpSession session) {
        validarInstructor(session);
        service.eliminar(id);
        return ResponseEntity.noContent().build();
    }


    //Metodo que valida que solo un ADMIN O INSTRUCTOR puede acceder a la accion
    private void validarInstructor(HttpSession session) {
        Usuario usuarioLogueado = (Usuario) session.getAttribute("usuarioLogueado");

        // Validar si no ha iniciado sesión o si su rol no es ADMIN ni INSTRUCTOR
        if (usuarioLogueado == null ||
                (!"INSTRUCTOR".equals(usuarioLogueado.getRol()))) {

            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "No autorizado. Debe iniciar sesión con el rol correcto.");
        }
    }
}
