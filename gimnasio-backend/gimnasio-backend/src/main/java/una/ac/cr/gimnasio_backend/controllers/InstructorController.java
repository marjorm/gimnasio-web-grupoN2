package una.ac.cr.gimnasio_backend.controllers;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import una.ac.cr.gimnasio_backend.models.Instructor;
import una.ac.cr.gimnasio_backend.models.Usuario;
import una.ac.cr.gimnasio_backend.services.InstructorService;
import java.util.List;

@RestController
@RequestMapping("/api/instructores")
public class InstructorController {
    private final InstructorService service;
    public InstructorController(InstructorService service) {
        this.service=service;
    }

    @GetMapping
    public List<Instructor> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public Instructor obtener(@PathVariable Integer id) {
        return service.obtener(id);
    }

    @PostMapping
    public ResponseEntity<Instructor> crear(@Valid @RequestBody Instructor x, HttpSession session) {
        validarAdmin(session);
        return ResponseEntity.status(HttpStatus.CREATED).body(service.crear(x));
    }

    @PutMapping("/{id}")
    public Instructor actualizar(@PathVariable Integer id, @Valid @RequestBody Instructor x, HttpSession session) {
        validarAdmin(session);
        return service.actualizar(id,x);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id, HttpSession session) {
        validarAdmin(session);
        service.eliminar(id);
        return ResponseEntity.noContent().build();
    }

    private void validarAdmin(HttpSession session) {
        Usuario usuarioLogueado = (Usuario) session.getAttribute("usuarioLogueado");

        // Validar si no ha iniciado sesión o si su rol no es ADMIN ni INSTRUCTOR
        if (usuarioLogueado == null ||
                !"INSTRUCTOR".equals(usuarioLogueado.getRol())) {

            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "No autorizado. Debe iniciar sesión con el rol correcto.");
        }
    }
}