package una.ac.cr.gimnasio_backend.services;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import una.ac.cr.gimnasio_backend.models.Curso;
import una.ac.cr.gimnasio_backend.repositories.CursoRepository;

import java.util.List;


/**
 * Aplica el patrón Singleton administrado por Spring Boot, garantizando que el
 * contenedor IoC cree y comparta una única instancia en memoria de esta clase
 * para toda la aplicación.
 */
@Service
public class CursoService {

    private final CursoRepository cursoRepository;

    public CursoService(CursoRepository cursoRepository) {
        this.cursoRepository = cursoRepository;
    }

    @Transactional(readOnly = true)
    public List<Curso> obtenerTodos() {
        return cursoRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Curso obtenerPorId(Integer id) {
        return cursoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Curso no encontrado con el ID: " + id));
    }

    @Transactional
    public Curso guardarCurso(Curso curso) {
        return cursoRepository.save(curso);
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
