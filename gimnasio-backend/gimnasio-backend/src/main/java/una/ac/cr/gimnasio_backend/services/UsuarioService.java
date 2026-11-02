package una.ac.cr.gimnasio_backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import una.ac.cr.gimnasio_backend.models.Usuario;
import una.ac.cr.gimnasio_backend.repositories.UsuarioRepository;

import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public Usuario autenticar(String username, String passwordPlano) {
        Optional<Usuario> optUsuario = usuarioRepository.findByUsername(username);

        if (optUsuario.isPresent()) {
            Usuario usuario = optUsuario.get();
            // Compara la contraseña plana con el hash de la BD
            if (passwordEncoder.matches(passwordPlano, usuario.getPasswordHash())) {
                return usuario; //si son coincidientes
            }
        }
        throw new RuntimeException("Credenciales invalidas");
    }

    public Usuario registrarUsuario(Usuario nuevoUsuario) {
        //Validar si ya existe un usuario con la misma cédula (id)
        if (nuevoUsuario.getId() != null && usuarioRepository.existsById(nuevoUsuario.getId())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Ya existe un usuario registrado con esta cédula."
            );
        }

        // Validar si el username ya está en uso por otra persona
        Optional<Usuario> usuarioExistente = usuarioRepository.findByUsername(nuevoUsuario.getUsername());
        if (usuarioExistente.isPresent()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "El nombre de usuario ya está en uso."
            );
        }

        // Cifrar la contraseña y guardar
        String passwordPlano = nuevoUsuario.getPasswordHash();
        String passwordCifrado = passwordEncoder.encode(passwordPlano);
        nuevoUsuario.setPasswordHash(passwordCifrado);

        return usuarioRepository.save(nuevoUsuario);
    }
}
