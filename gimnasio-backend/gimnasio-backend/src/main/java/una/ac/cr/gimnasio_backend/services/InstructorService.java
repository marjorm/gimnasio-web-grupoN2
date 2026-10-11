package una.ac.cr.gimnasio_backend.services;

import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import una.ac.cr.gimnasio_backend.models.Instructor;
import una.ac.cr.gimnasio_backend.repositories.InstructorRepository;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Service
@Scope(ConfigurableBeanFactory.SCOPE_SINGLETON)
public class InstructorService {
    private final InstructorRepository repository;
    public InstructorService(InstructorRepository repository) {
        this.repository = repository;
    }

    @Transactional(readOnly = true)
    public List<Instructor> listar() {
        List<Instructor> resultado = new ArrayList<>(); Iterator<Instructor> it = repository.findAll().iterator();
        while (it.hasNext()) resultado.add(it.next()); return resultado;
    }

    @Transactional(readOnly = true)
    public Instructor obtener(Integer id) {
        return repository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Instructor no encontrado"));
    }

    @Transactional
    public Instructor crear(Instructor x) {
        if(repository.existsById(x.getId())) throw new ResponseStatusException(HttpStatus.CONFLICT, "Ya existe un instructor con ese código");
        return repository.save(x);
    }

    @Transactional public Instructor actualizar(Integer id, Instructor x) {
        Instructor e=obtener(id);
        e.setNombre(x.getNombre());
        e.setApellido1(x.getApellido1());
        e.setApellido2(x.getApellido2());
        e.setDireccion(x.getDireccion());
        e.setEMail(x.getEMail());
        e.setFechaContratacion(x.getFechaContratacion());
        e.setCelular(x.getCelular());
        e.setTelHabitacion(x.getTelHabitacion());
        return repository.save(e);
    }

    @Transactional public void eliminar(Integer id) {
        repository.delete(obtener(id));
    }
}