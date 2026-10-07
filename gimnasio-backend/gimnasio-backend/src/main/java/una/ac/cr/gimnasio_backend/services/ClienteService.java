package una.ac.cr.gimnasio_backend.services;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import una.ac.cr.gimnasio_backend.models.Cliente;
import una.ac.cr.gimnasio_backend.repositories.ClienteRepository;

import java.util.List;

/**
 * Aplica el patrón Singleton administrado por Spring Boot, garantizando que el
 * contenedor IoC cree y comparta una única instancia en memoria de esta clase
 * para toda la aplicación.
 */
@Service
public class ClienteService {

    private final ClienteRepository clienteRepository;

    // Inyección de dependencias por constructor
    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }


    @Transactional(readOnly = true)
    public List<Cliente> obtenerTodos() {
        return clienteRepository.findAll();
    }


    @Transactional(readOnly = true)
    public Cliente obtenerPorCedula(Integer cedula) {
        return clienteRepository.findById(cedula)
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado con la cédula: " + cedula));
    }

    @Transactional
    public Cliente guardarCliente(Cliente cliente) {
        return clienteRepository.save(cliente);
    }


    @Transactional
    public Cliente actualizarCliente(Integer cedula, Cliente clienteDetalles) {
        Cliente clienteExistente = obtenerPorCedula(cedula);

        clienteExistente.setNombre(clienteDetalles.getNombre());
        clienteExistente.setApellido1(clienteDetalles.getApellido1());
        clienteExistente.setApellido2(clienteDetalles.getApellido2());
        clienteExistente.setDireccion(clienteDetalles.getDireccion());
        clienteExistente.setEMail(clienteDetalles.getEMail());
        clienteExistente.setFechaInscripcion(clienteDetalles.getFechaInscripcion());
        clienteExistente.setCelular(clienteDetalles.getCelular());
        clienteExistente.setTelHabitacion(clienteDetalles.getTelHabitacion());

        return clienteRepository.save(clienteExistente);
    }

    @Transactional
    public void eliminarCliente(Integer cedula) {
        Cliente cliente = obtenerPorCedula(cedula);
        clienteRepository.delete(cliente);
    }
}