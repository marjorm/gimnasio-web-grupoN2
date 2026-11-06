package una.ac.cr.gimnasio_backend.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDateTime;

@Entity @Table(name = "inscripciones")
public class Inscripcion {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull @Column(name = "cliente_id", nullable = false)
    private Integer clienteId;
    @NotBlank @Column(nullable = false, length = 10)
    private String tipo;
    @NotNull @Positive @Column(name = "item_id", nullable = false)
    private Integer itemId;
    @Column(nullable = false, length = 12)
    private String estado = "ACTIVA";
    @Column(name = "fecha_registro", nullable = false)
    private LocalDateTime fechaRegistro = LocalDateTime.now();
    @Column(name = "fecha_cancelacion")
    private LocalDateTime fechaCancelacion;
    public Long getId(){return id;} public void setId(Long v){id=v;}
    public Integer getClienteId(){return clienteId;} public void setClienteId(Integer v){clienteId=v;}
    public String getTipo(){return tipo;} public void setTipo(String v){tipo=v;}
    public Integer getItemId(){return itemId;} public void setItemId(Integer v){itemId=v;}
    public String getEstado(){return estado;} public void setEstado(String v){estado=v;}
    public LocalDateTime getFechaRegistro(){return fechaRegistro;} public void setFechaRegistro(LocalDateTime v){fechaRegistro=v;}
    public LocalDateTime getFechaCancelacion(){return fechaCancelacion;} public void setFechaCancelacion(LocalDateTime v){fechaCancelacion=v;}
}
