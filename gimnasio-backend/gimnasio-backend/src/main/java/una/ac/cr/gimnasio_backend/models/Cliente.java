package una.ac.cr.gimnasio_backend.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import jakarta.validation.constraints.*;
import java.time.LocalDate;

import java.time.LocalDate;

@Entity
@Table(name = "cliente")
public class Cliente {
    @Id
    @NotNull(message = "La cedula es obligatoria")
    @Column(name = "cedula", nullable = false)
    private Integer id;

    @NotBlank(message = "El nombre es obligatorio")
    @Size(min = 2, max = 30, message = "El nombre debe tener entre 2 y 30 caracteres")
    @Column(name = "nombre", nullable = false, length = 30)
    private String nombre;

    @NotBlank(message = "El primer apellido es obligatorio")
    @Size(min = 2, max = 30)
    @Column(name = "apellido_1", nullable = false, length = 30)
    private String apellido1;

    @NotBlank(message = "El segundo apellido es obligatorio")
    @Size(min = 2, max = 30)
    @Column(name = "apellido_2", nullable = false, length = 30)
    private String apellido2;

    @Size(max = 50)
    @Column(name = "direccion", length = 50)
    private String direccion;

    @Email(message = "El correo debe tener un formato válido")
    @Size(max = 30)
    @Column(name = "e_mail", length = 30)
    private String eMail;

    @NotNull(message = "La fecha de inscripción es obligatoria")
    @PastOrPresent(message = "La fecha de inscripción no puede ser futura")
    @Column(name = "fecha_inscripcion", nullable = false)
    private LocalDate fechaInscripcion;

    @NotNull(message = "El celular es obligatorio")
    @Column(name = "celular", nullable = false)
    private Integer celular;

    @NotNull(message = "El teléfono de habitación es obligatorio")
    @Column(name = "tel_habitacion", nullable = false)
    private Integer telHabitacion;
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido1() {
        return apellido1;
    }

    public void setApellido1(String apellido1) {
        this.apellido1 = apellido1;
    }

    public String getApellido2() {
        return apellido2;
    }

    public void setApellido2(String apellido2) {
        this.apellido2 = apellido2;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getEMail() {
        return eMail;
    }

    public void setEMail(String eMail) {
        this.eMail = eMail;
    }

    public LocalDate getFechaInscripcion() {
        return fechaInscripcion;
    }

    public void setFechaInscripcion(LocalDate fechaInscripcion) {
        this.fechaInscripcion = fechaInscripcion;
    }

    public Integer getCelular() {
        return celular;
    }

    public void setCelular(Integer celular) {
        this.celular = celular;
    }

    public Integer getTelHabitacion() {
        return telHabitacion;
    }

    public void setTelHabitacion(Integer telHabitacion) {
        this.telHabitacion = telHabitacion;
    }

}