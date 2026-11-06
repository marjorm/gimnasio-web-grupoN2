package una.ac.cr.gimnasio_backend.models;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDateTime;
@Entity @Table(name="consultas_contacto")
public class ConsultaContacto {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @NotBlank @Size(max=60) private String nombre;
 @NotBlank @Email @Size(max=120) private String correo;
 @NotBlank @Size(max=100) private String asunto;
 @NotBlank @Size(min=5,max=2000) @Column(nullable=false,length=2000) private String contenido;
 @Column(name="fecha_creacion",nullable=false) private LocalDateTime fechaCreacion=LocalDateTime.now();
 @Column(nullable=false) private String estado="NUEVA";
 public Long getId(){return id;}public void setId(Long v){id=v;}
 public String getNombre(){return nombre;}public void setNombre(String v){nombre=v;}
 public String getCorreo(){return correo;}public void setCorreo(String v){correo=v;}
 public String getAsunto(){return asunto;}public void setAsunto(String v){asunto=v;}
 public String getContenido(){return contenido;}public void setContenido(String v){contenido=v;}
 public LocalDateTime getFechaCreacion(){return fechaCreacion;}public void setFechaCreacion(LocalDateTime v){fechaCreacion=v;}
 public String getEstado(){return estado;}public void setEstado(String v){estado=v;}
}
