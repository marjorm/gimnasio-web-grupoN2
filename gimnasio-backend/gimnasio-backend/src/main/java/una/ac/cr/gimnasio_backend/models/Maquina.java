package una.ac.cr.gimnasio_backend.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "maquinas")
public class Maquina {
    @Id
    @NotNull(message = "El ID de la maquina es obligatorio")
    @Column(name = "id_maquina", nullable = false)
    private Integer id;

    @NotBlank(message = "La descripción de la maquina no puede estar vacía")
    @Size(min = 3, max = 50, message = "La descripción debe tener entre 3 y 50 caracteres")
    @Column(name = "descripcion", nullable = false, length = 50)
    private String descripcion;


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }


}