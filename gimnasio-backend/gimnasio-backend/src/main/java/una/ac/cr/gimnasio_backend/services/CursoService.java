package una.ac.cr.gimnasio_backend.services;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import una.ac.cr.gimnasio_backend.models.Curso;
import una.ac.cr.gimnasio_backend.repositories.CursoRepository;
import una.ac.cr.gimnasio_backend.exceptions.CursoNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.context.ApplicationEventPublisher;
import una.ac.cr.gimnasio_backend.events.CursoRegistradoEvent;
import org.springframework.context.annotation.Scope;

import java.util.List;


@Service
@Scope("singleton")
public class CursoService {

    private final CursoRepository cursoRepository;
    private final ApplicationEventPublisher eventPublisher;

    public CursoService(CursoRepository cursoRepository, ApplicationEventPublisher eventPublisher) {
        this.cursoRepository = cursoRepository;
        this.eventPublisher = eventPublisher;
    }

    @Transactional(readOnly = true)
    public List<Curso> obtenerTodos() {
        return cursoRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Curso obtenerPorId(Integer id) {
        return cursoRepository.findById(id)
                .orElseThrow(() -> new CursoNotFoundException(
                        "Curso no encontrado con el ID: " + id));
    }

    @Transactional
    public Curso guardarCurso(Curso curso) {

        if (curso.getId() == null || curso.getId() <= 0) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "El ID del curso debe ser mayor que cero."
            );
        }

        if (cursoRepository.existsById(curso.getId())) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Ya existe un curso registrado con ese ID."
            );
        }

        Curso cursoGuardado = cursoRepository.save(curso);
        eventPublisher.publishEvent(new CursoRegistradoEvent(cursoGuardado.getId(), cursoGuardado.getDescripcion()));
        return cursoGuardado;
    }

    @Transactional
    public Curso actualizarCurso(Integer id, Curso cursoDetalles) {
        Curso cursoExistente = obtenerPorId(id);

        cursoExistente.setDescripcion(cursoDetalles.getDescripcion());

        return cursoRepository.save(cursoExistente);
    }

    @Transactional
    public void eliminarCurso(Integer id) {
        Curso curso = obtenerPorId(id);
        cursoRepository.delete(curso);
    }
}
