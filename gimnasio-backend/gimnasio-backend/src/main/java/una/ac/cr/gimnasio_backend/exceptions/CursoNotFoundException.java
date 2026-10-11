package una.ac.cr.gimnasio_backend.exceptions;

public class CursoNotFoundException extends RuntimeException {

    public CursoNotFoundException(String mensaje) {

        super(mensaje);
    }
}