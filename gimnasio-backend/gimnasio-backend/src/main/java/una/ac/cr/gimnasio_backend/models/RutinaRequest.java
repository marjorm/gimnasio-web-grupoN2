package una.ac.cr.gimnasio_backend.models;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.time.LocalDate;


public class RutinaRequest {
    @NotNull(message = "El ID de rutina es obligatorio")
    @Positive(message = "El ID debe ser positivo")
    private Integer id;

    @NotNull(message = "La cédula del cliente es obligatoria")
    @Positive(message = "La cédula debe ser positiva")
    private Integer clienteId;

    @NotNull(message = "El código del instructor es obligatorio")
    @Positive(message = "El código debe ser positivo")
    private Integer instructorId;

    @NotNull(message = "El ID de la máquina es obligatorio")
    @Positive(message = "El ID debe ser positivo")
    private Integer maquina;

    @NotNull(message = "La fecha es obligatoria")
    private LocalDate fecha;

    @NotNull(message = "Las horas son obligatorias")
    @Positive(message = "Las horas deben ser positivas")
    private Integer horas;

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public Integer getClienteId() { return clienteId; }
    public void setClienteId(Integer clienteId) { this.clienteId = clienteId; }

    public Integer getInstructorId() { return instructorId; }
    public void setInstructorId(Integer instructorId) { this.instructorId = instructorId; }

    public Integer getMaquina() { return maquina; }
    public void setMaquina(Integer maquina) { this.maquina = maquina; }

    public LocalDate getFecha() { return fecha; }
    public void setFecha(LocalDate fecha) { this.fecha = fecha; }

    public Integer getHoras() { return horas; }
    public void setHoras(Integer horas) { this.horas = horas; }
}