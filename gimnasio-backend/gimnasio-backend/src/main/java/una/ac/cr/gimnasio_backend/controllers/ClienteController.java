package una.ac.cr.gimnasio_backend.controllers;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import una.ac.cr.gimnasio_backend.models.Cliente;
import una.ac.cr.gimnasio_backend.services.ClienteService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ClienteController {
    private final ClienteService clienteService;

    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }


    @GetMapping
    public ResponseEntity<List<Cliente>> obtenerTodos() {
        List<Cliente> clientes = clienteService.obtenerTodos();
        return ResponseEntity.ok(clientes);
    }

    @GetMapping("/{cedula}")
    public ResponseEntity<Cliente> obtenerPorCedula(@PathVariable Integer cedula) {
        Cliente cliente = clienteService.obtenerPorCedula(cedula);
        return ResponseEntity.ok(cliente);
    }

    @PostMapping
    public ResponseEntity<Cliente> guardarCliente(@RequestBody Cliente cliente) {
        Cliente nuevoCliente = clienteService.guardarCliente(cliente);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoCliente);
    }

    @PutMapping("/{cedula}")
    public ResponseEntity<Cliente> actualizarCliente(
            @PathVariable Integer cedula,
            @RequestBody Cliente clienteDetalles) {
        Cliente clienteActualizado = clienteService.actualizarCliente(cedula, clienteDetalles);
        return ResponseEntity.ok(clienteActualizado);
    }

    @DeleteMapping("/{cedula}")
    public ResponseEntity<Void> eliminarCliente(@PathVariable Integer cedula) {
        clienteService.eliminarCliente(cedula);
        return ResponseEntity.noContent().build();
    }


}
