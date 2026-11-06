package una.ac.cr.gimnasio_backend.models;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
@Entity @Table(name="curso_detalle")
public class CursoDetalle {
 @Id @Column(name="curso_id") private Integer cursoId;
 @NotBlank @Size(max=80) @Column(nullable=false) private String horario;
 @NotNull @Min(0) @Column(nullable=false) private Integer cupos;
 @Size(max=255) private String imagen;
 public Integer getCursoId(){return cursoId;}public void setCursoId(Integer v){cursoId=v;}
 public String getHorario(){return horario;}public void setHorario(String v){horario=v;}
 public Integer getCupos(){return cupos;}public void setCupos(Integer v){cupos=v;}
 public String getImagen(){return imagen;}public void setImagen(String v){imagen=v;}
}
