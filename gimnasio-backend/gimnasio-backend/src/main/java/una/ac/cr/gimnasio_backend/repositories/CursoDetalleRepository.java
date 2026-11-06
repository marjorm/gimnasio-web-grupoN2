package una.ac.cr.gimnasio_backend.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.Optional;
import una.ac.cr.gimnasio_backend.models.CursoDetalle;
public interface CursoDetalleRepository extends JpaRepository<CursoDetalle, Integer> {
    // Bloquea la fila de capacidad durante el alta concurrente.
    @Query(value = "SELECT * FROM curso_detalle WHERE curso_id = :id FOR UPDATE", nativeQuery = true)
    Optional<CursoDetalle> bloquearParaInscripcion(@Param("id") Integer id);
}
