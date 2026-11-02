package una.ac.cr.gimnasio_backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import una.ac.cr.gimnasio_backend.models.Usuario;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    Optional<Usuario> findByUsername(String username);
}
