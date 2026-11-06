package una.ac.cr.gimnasio_backend.models;
import jakarta.persistence.*;
import java.time.LocalDateTime;
@Entity @Table(name="bajas_gimnasio")
public class BajaGimnasio {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @Column(name="cliente_id",nullable=false) private Integer clienteId;
 @Column(name="fecha_baja",nullable=false) private LocalDateTime fechaBaja=LocalDateTime.now();
 @Column(nullable=false,length=200) private String motivo="Solicitada por el cliente";
 public Long getId(){return id;}public void setId(Long v){id=v;}
 public Integer getClienteId(){return clienteId;}public void setClienteId(Integer v){clienteId=v;}
 public LocalDateTime getFechaBaja(){return fechaBaja;}public void setFechaBaja(LocalDateTime v){fechaBaja=v;}
 public String getMotivo(){return motivo;}public void setMotivo(String v){motivo=v;}
}
