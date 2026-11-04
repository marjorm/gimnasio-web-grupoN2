package una.ac.cr.gimnasio_backend.controllers;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import una.ac.cr.gimnasio_backend.models.Curso;
import una.ac.cr.gimnasio_backend.services.CursoService;
import org.springframework.web.server.ResponseStatusException;
import una.ac.cr.gimnasio_backend.models.Usuario;

import java.util.List;

@RestController
@RequestMapping("/api/cursos")
public class CursoController {
    private final CursoService cursoService;

    public CursoController(CursoService cursoService) {
        this.cursoService = cursoService;
    }

    @GetMapping
    public ResponseEntity<List<Curso>> obtenerTodos() {
        List<Curso> cursos = cursoService.obtenerTodos();
        return ResponseEntity.ok(cursos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Curso> obtenerPorId(@PathVariable Integer id) {
        Curso curso = cursoService.obtenerPorId(id);
        return ResponseEntity.ok(curso);
    }

    @PostMapping
    public ResponseEntity<Curso> guardarCurso(@Valid @RequestBody Curso curso, HttpSession session) {
        validarAdministradorOInstructor(session);
        Curso nuevoCurso = cursoService.guardarCurso(curso);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoCurso);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Curso> actualizarCurso(@PathVariable Integer id, @Valid @RequestBody Curso cursoDetalles,
            HttpSession session) {
        validarAdministradorOInstructor(session);
        Curso cursoActualizado = cursoService.actualizarCurso(id, cursoDetalles);
        return ResponseEntity.ok(cursoActualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarCurso(@PathVariable Integer id, HttpSession session) {
        validarAdministradorOInstructor(session);
        cursoService.eliminarCurso(id);
        return ResponseEntity.noContent().build();
    }


    private void validarAdministradorOInstructor(HttpSession session) {

        Usuario usuarioLogueado = (Usuario) session.getAttribute("usuarioLogueado");

        if (usuarioLogueado == null) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Debe iniciar sesión."
            );
        }

        String rol = usuarioLogueado.getRol();

        if (!"ADMIN".equals(rol) && !"INSTRUCTOR".equals(rol)) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "No tiene permisos para realizar esta acción."
            );
        }
    }

}
