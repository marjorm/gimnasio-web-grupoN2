package una.ac.cr.gimnasio_backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import una.ac.cr.gimnasio_backend.models.Rutina;

import java.util.List;

public interface RutinaRepository extends JpaRepository<Rutina, Integer> {
    List<Rutina> findRutinasByCliente_Id(Integer clienteId);
}
