
package una.ac.cr.gimnasio_backend.exceptions;

public class ClienteNotFoundException extends RuntimeException {

    public ClienteNotFoundException(String mensaje) {

        super(mensaje);
    }
}