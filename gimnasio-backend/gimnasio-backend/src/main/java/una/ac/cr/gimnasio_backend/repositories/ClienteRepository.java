package una.ac.cr.gimnasio_backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import una.ac.cr.gimnasio_backend.models.Cliente;

import java.util.Optional;

public interface ClienteRepository extends JpaRepository<Cliente, Integer> {

    Optional<Cliente> findByEMail(String eMail);

    boolean existsById(Integer id);
}