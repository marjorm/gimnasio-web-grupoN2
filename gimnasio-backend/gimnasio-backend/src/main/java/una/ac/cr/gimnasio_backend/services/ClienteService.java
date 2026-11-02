package una.ac.cr.gimnasio_backend.services;


import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import una.ac.cr.gimnasio_backend.models.Cliente;
import una.ac.cr.gimnasio_backend.repositories.ClienteRepository;
import una.ac.cr.gimnasio_backend.exceptions.ClienteNotFoundException;

import java.util.List;


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
                .orElseThrow(() -> new ClienteNotFoundException(
                        "Cliente no encontrado con la cédula: " + cedula));
    }

    @Transactional
    public Cliente guardarCliente(Cliente cliente) {
        // Validamos si ya existe un cliente con esta misma cédula (id)
        if (cliente.getId() != null && clienteRepository.existsById(cliente.getId())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Ya existe un cliente registrado con esta cédula."
            );
        }
        // Si no existe, procede a guardarlo de forma segura
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