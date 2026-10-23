package una.ac.cr.gimnasio_backend.controllers;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import una.ac.cr.gimnasio_backend.models.Rutina;
import una.ac.cr.gimnasio_backend.models.RutinaRequest;
import una.ac.cr.gimnasio_backend.services.RutinaService;
import java.util.List;

@RestController
@RequestMapping("/api/rutinas")
public class RutinaController {
    private final RutinaService service;

    public RutinaController(RutinaService service) {
        this.service = service;
    }

    @GetMapping
    public List<Rutina> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public Rutina obtener(@PathVariable Integer id) {
        return service.obtener(id);
    }

    @PostMapping
    public ResponseEntity<Rutina> crear(@Valid @RequestBody RutinaRequest dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.crear(dto));
    }

    @PutMapping("/{id}")
    public Rutina actualizar(@PathVariable Integer id, @Valid @RequestBody RutinaRequest dto) {
        return service.actualizar(id, dto);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        service.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
