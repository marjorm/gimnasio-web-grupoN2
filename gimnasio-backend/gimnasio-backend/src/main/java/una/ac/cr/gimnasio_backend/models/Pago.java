package una.ac.cr.gimnasio_backend.models;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity @Table(name = "pagos")
public class Pago {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @NotNull @Positive @Column(name="cliente_id",nullable=false) private Integer clienteId;
 @NotBlank @Size(max=100) @Column(nullable=false) private String concepto;
 @NotNull @DecimalMin("0.01") @Column(nullable=false,precision=12,scale=2) private BigDecimal monto;
 @NotNull @Column(name="fecha_vencimiento",nullable=false) private LocalDate fechaVencimiento;
 @Column(name="fecha_pago") private LocalDate fechaPago;
 @NotBlank @Pattern(regexp="PENDIENTE|PAGADO") @Column(nullable=false) private String estado="PENDIENTE";
 public Long getId(){return id;}public void setId(Long v){id=v;}
 public Integer getClienteId(){return clienteId;}public void setClienteId(Integer v){clienteId=v;}
 public String getConcepto(){return concepto;}public void setConcepto(String v){concepto=v;}
 public BigDecimal getMonto(){return monto;}public void setMonto(BigDecimal v){monto=v;}
 public LocalDate getFechaVencimiento(){return fechaVencimiento;}public void setFechaVencimiento(LocalDate v){fechaVencimiento=v;}
 public LocalDate getFechaPago(){return fechaPago;}public void setFechaPago(LocalDate v){fechaPago=v;}
 public String getEstado(){return estado;}public void setEstado(String v){estado=v;}
}
