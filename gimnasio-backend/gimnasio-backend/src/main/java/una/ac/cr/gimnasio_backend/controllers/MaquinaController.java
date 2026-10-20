package una.ac.cr.gimnasio_backend.controllers;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import una.ac.cr.gimnasio_backend.models.Maquina;
import una.ac.cr.gimnasio_backend.services.MaquinaService;
import java.util.List;

@RestController
@RequestMapping("/api/maquinas")
@CrossOrigin(origins = "*")
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
    public ResponseEntity<Maquina> crear(@Valid @RequestBody Maquina x) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.crear(x));
    }

    @PutMapping("/{id}")
    public Maquina actualizar(@PathVariable Integer id, @Valid @RequestBody Maquina x) {
        return service.actualizar(id,x);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        service.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
