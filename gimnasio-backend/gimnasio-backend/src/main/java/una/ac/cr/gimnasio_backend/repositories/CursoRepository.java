package una.ac.cr.gimnasio_backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import una.ac.cr.gimnasio_backend.models.Curso;

public interface CursoRepository extends JpaRepository<Curso, Integer> {
}
