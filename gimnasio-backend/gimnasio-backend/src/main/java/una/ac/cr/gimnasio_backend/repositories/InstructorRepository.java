package una.ac.cr.gimnasio_backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import una.ac.cr.gimnasio_backend.models.Instructor;

public interface InstructorRepository extends JpaRepository<Instructor, Integer> {

}
