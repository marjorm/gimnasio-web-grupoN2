package una.ac.cr.gimnasio_backend.models;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDate;
@Entity @Table(name="historial_curso")
public class HistorialCurso {
 @Id @NotNull @Positive @Column(name="id_historial") private Integer id;
 @NotNull @Positive @Column(name="cliente") private Integer clienteId;
 @NotNull @Positive @Column(name="instructor") private Integer instructorId;
 @NotNull @Positive @Column(name="curso") private Integer cursoId;
 @NotNull @Column(name="fecha") private LocalDate fecha;
 @NotNull @Positive @Column(name="horas") private Integer horas;
 public Integer getId(){return id;}public void setId(Integer v){id=v;}
 public Integer getClienteId(){return clienteId;}public void setClienteId(Integer v){clienteId=v;}
 public Integer getInstructorId(){return instructorId;}public void setInstructorId(Integer v){instructorId=v;}
 public Integer getCursoId(){return cursoId;}public void setCursoId(Integer v){cursoId=v;}
 public LocalDate getFecha(){return fecha;}public void setFecha(LocalDate v){fecha=v;}
 public Integer getHoras(){return horas;}public void setHoras(Integer v){horas=v;}
}
