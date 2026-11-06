package una.ac.cr.gimnasio_backend.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import una.ac.cr.gimnasio_backend.models.BajaGimnasio;
public interface BajaGimnasioRepository extends JpaRepository<BajaGimnasio, Long> {
    boolean existsByClienteId(Integer clienteId);
}
