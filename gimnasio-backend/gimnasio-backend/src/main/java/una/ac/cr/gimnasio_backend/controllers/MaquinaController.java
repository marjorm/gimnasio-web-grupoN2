package una.ac.cr.gimnasio_backend.controllers;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import una.ac.cr.gimnasio_backend.models.Maquina;
import una.ac.cr.gimnasio_backend.models.Usuario;
import una.ac.cr.gimnasio_backend.services.MaquinaService;
import java.util.List;

@RestController
@RequestMapping("/api/maquinas")
public class MaquinaController {
    private final MaquinaService service;

    public MaquinaController(MaquinaService service) {
        this.service=service;
    }

    @GetMapping
    public List<Maquina> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public Maquina obtener(@PathVariable Integer id) {
        return service.obtener(id);
    }

    @PostMapping
    public ResponseEntity<Maquina> crear(@Valid @RequestBody Maquina x, HttpSession session) {
        validarInstructor(session);
        return ResponseEntity.status(HttpStatus.CREATED).body(service.crear(x));
    }

    @PutMapping("/{id}")
    public Maquina actualizar(@PathVariable Integer id, @Valid @RequestBody Maquina x, HttpSession session) {
        validarInstructor(session);
        return service.actualizar(id,x);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id, HttpSession session) {
        validarInstructor(session);
        service.eliminar(id);
        return ResponseEntity.noContent().build();
    }


    private void validarInstructor(HttpSession session) {

        Usuario usuarioLogueado = (Usuario) session.getAttribute("usuarioLogueado");

        // Verificar que el usuario haya iniciado sesión
        if (usuarioLogueado == null) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED, "Debe iniciar sesión."
            );
        }

        String rol = usuarioLogueado.getRol();

        // Permitir únicamente ADMIN e INSTRUCTOR
        if (!"ADMIN".equals(rol) && !"INSTRUCTOR".equals(rol)) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN, "No tiene permisos para realizar esta acción."
            );
        }
    }

}
