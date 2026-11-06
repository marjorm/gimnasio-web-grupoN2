package una.ac.cr.gimnasio_backend.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import una.ac.cr.gimnasio_backend.models.Pago;
public interface PagoRepository extends JpaRepository<Pago, Long> {
    java.util.List<Pago> findByClienteIdOrderByFechaVencimientoDesc(Integer clienteId);
    boolean existsByClienteIdAndEstadoAndFechaVencimientoLessThanEqual(Integer clienteId,String estado,java.time.LocalDate fecha);
}
