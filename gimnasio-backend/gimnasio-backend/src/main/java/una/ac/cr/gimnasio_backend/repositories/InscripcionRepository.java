package una.ac.cr.gimnasio_backend.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import una.ac.cr.gimnasio_backend.models.Inscripcion;
public interface InscripcionRepository extends JpaRepository<Inscripcion, Long> {
    long countByTipoAndItemIdAndEstado(String tipo, Integer itemId, String estado);
    java.util.List<Inscripcion> findByClienteIdOrderByFechaRegistroDesc(Integer clienteId);
    java.util.List<Inscripcion> findByEstadoOrderByFechaRegistroDesc(String estado);
    boolean existsByClienteIdAndTipoAndItemIdAndEstado(Integer clienteId,String tipo,Integer itemId,String estado);
    java.util.List<Inscripcion> findByClienteIdAndEstado(Integer clienteId,String estado);
}
