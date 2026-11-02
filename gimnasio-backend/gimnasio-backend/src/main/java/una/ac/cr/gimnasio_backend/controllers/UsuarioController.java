package una.ac.cr.gimnasio_backend.controllers;

import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import una.ac.cr.gimnasio_backend.models.Usuario;
import una.ac.cr.gimnasio_backend.services.UsuarioService;

import java.util.Map;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {
    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario request, HttpSession session) {
        try {
            Usuario usuario = usuarioService.autenticar(request.getUsername(), request.getPasswordHash());

            if (usuario == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas");
            }
            usuario.setPasswordHash("NA"); // Limpiar la contraseña por seguridad
            session.setAttribute("usuarioLogueado", usuario);
            return ResponseEntity.ok(usuario);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<Usuario> crearUsuario( @RequestBody Usuario nuevoUsuario) {
        Usuario usuarioCreado = usuarioService.registrarUsuario(nuevoUsuario);
        usuarioCreado.setPasswordHash("NA"); // Ocultamos el hash por seguridad
        return ResponseEntity.status(HttpStatus.CREATED).body(usuarioCreado);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        // Invalida la sesion actual en la memoria del servidor
        session.invalidate();
        return ResponseEntity.ok().body("Sesión cerrada exitosamente");
    }

}
