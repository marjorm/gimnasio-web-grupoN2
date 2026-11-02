package una.ac.cr.gimnasio_backend.controllers;


import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import org.springframework.web.server.ResponseStatusException;
import una.ac.cr.gimnasio_backend.models.Cliente;
import una.ac.cr.gimnasio_backend.models.Usuario;
import una.ac.cr.gimnasio_backend.services.ClienteService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/clientes")
public class ClienteController {
    private final ClienteService clienteService;

    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }


    @GetMapping
    public ResponseEntity<List<Cliente>> obtenerTodos(HttpSession session) {
        validarInstructor(session);
        List<Cliente> clientes = clienteService.obtenerTodos();
        return ResponseEntity.ok(clientes);
    }

    //Que solo el instructor y el mismo cliente pueda ver la informacion del cliente
    @GetMapping("/{cedula}")
    public ResponseEntity<Cliente> obtenerPorCedula(@PathVariable Integer cedula, HttpSession session) {
        Usuario usuarioLogueado = (Usuario) session.getAttribute("usuarioLogueado");

        if (usuarioLogueado == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Debe iniciar sesión");
        }

        // Verificar si es instructor
        boolean esInstructor = "INSTRUCTOR".equals(usuarioLogueado.getRol());

        // Verificar si es el mismo cliente consultando su propia cedula
        boolean esElMismoCliente = usuarioLogueado.getId().equals(cedula);

        // Si NO es instructor Y NO es el mismo cliente, entonces no autorizado
        if (!esInstructor && !esElMismoCliente) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "No autorizado para ver esta informacion");
        }

        Cliente cliente = clienteService.obtenerPorCedula(cedula);
        return ResponseEntity.ok(cliente);
    }

    @PostMapping
    public ResponseEntity<Cliente> guardarCliente( @Valid @RequestBody Cliente cliente, HttpSession session) {
        validarInstructor(session);
        Cliente nuevoCliente = clienteService.guardarCliente(cliente);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoCliente);
    }

    @PutMapping("/{cedula}")
    public ResponseEntity<Cliente> actualizarCliente(
            @PathVariable Integer cedula,
            @Valid @RequestBody Cliente clienteDetalles, HttpSession session) {
        validarInstructor(session);
        Cliente clienteActualizado = clienteService.actualizarCliente(cedula, clienteDetalles);
        return ResponseEntity.ok(clienteActualizado);
    }

    @DeleteMapping("/{cedula}")
    public ResponseEntity<Void> eliminarCliente(@PathVariable Integer cedula, HttpSession session) {
        validarInstructor(session);
        clienteService.eliminarCliente(cedula);
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
