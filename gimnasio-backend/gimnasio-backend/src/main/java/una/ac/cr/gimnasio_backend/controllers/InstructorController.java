package una.ac.cr.gimnasio_backend.controllers;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import una.ac.cr.gimnasio_backend.models.Instructor;
import una.ac.cr.gimnasio_backend.services.InstructorService;
import java.util.List;

@RestController
@RequestMapping("/api/instructores")
@CrossOrigin(origins = "*")
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
    public ResponseEntity<Instructor> crear(@Valid @RequestBody Instructor x) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.crear(x));
    }

    @PutMapping("/{id}")
    public Instructor actualizar(@PathVariable Integer id, @Valid @RequestBody Instructor x) {
        return service.actualizar(id,x);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        service.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}