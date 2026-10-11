package una.ac.cr.gimnasio_backend.models;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;


public class ContactoRequest {
    @NotBlank(message = "El nombre es obligatorio")
    @Size(min = 2, max = 60, message = "El nombre debe tener entre 2 y 60 caracteres")
    private String nombre;

    @NotBlank(message = "El correo es obligatorio")
    @Email(message = "El correo debe tener un formato válido")
    @Size(max = 120, message = "El correo no puede superar 120 caracteres")
    private String correo;

    @NotBlank(message = "El asunto es obligatorio")
    @Size(max = 100, message = "El asunto no puede superar 100 caracteres")
    private String asunto;

    @NotBlank(message = "El mensaje es obligatorio")
    @Size(min = 5, max = 2000, message = "El mensaje debe tener entre 5 y 2000 caracteres")
    private String contenido;

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getCorreo() { return correo; }
    public void setCorreo(String correo) { this.correo = correo; }

    public String getAsunto() { return asunto; }
    public void setAsunto(String asunto) { this.asunto = asunto; }

    public String getContenido() { return contenido; }
    public void setContenido(String contenido) { this.contenido = contenido; }
}
