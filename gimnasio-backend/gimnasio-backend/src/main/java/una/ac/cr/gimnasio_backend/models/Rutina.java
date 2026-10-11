package una.ac.cr.gimnasio_backend.models;

import una.ac.cr.gimnasio_backend.models.Instructor;
import una.ac.cr.gimnasio_backend.models.Cliente;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import java.time.LocalDate;


@Entity
@Table(name = "rutinas")
public class Rutina {

    @Id
    @NotNull(message = "La cedula es obligatoria")
    @Column(name = "id_rutina", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "cliente", nullable = false)
    private Cliente cliente;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "instructor", nullable = false)
    private Instructor instructor;

    @NotNull(message = "La maquina es obligatoria")
    @Column(name = "maquina", nullable = false)
    private Integer maquina;

    @NotNull(message = "La fecha es obligatoria")
    @Column(name = "fecha", nullable = false)
    private LocalDate fecha;

    @NotNull(message = "La cantidad de horas es obligatoria")
    @Column(name = "horas", nullable = false)
    private Integer horas;


    public Integer getId() {return id;}
    public void setId(Integer id) {this.id = id;}

    public Integer getMaquina() {return maquina;}
    public void setMaquina(Integer maquina) {this.maquina = maquina;}


    public Cliente getCliente() {
        return cliente;
    }
    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public Instructor getInstructor() {
        return instructor;
    }
    public void setInstructor(Instructor instructor) {
        this.instructor = instructor;
    }

    public LocalDate getFecha_Rutina() {
        return fecha;
    }
    public void setFecha_Rutina(LocalDate fecha_Rutina) {
        this.fecha = fecha_Rutina;
    }

    public Integer getHoras() {return horas;}
    public void setHoras(Integer horas) {this.horas = horas;}

}