
package una.ac.cr.gimnasio_backend.soap;

import jakarta.xml.bind.annotation.XmlAccessType;
import jakarta.xml.bind.annotation.XmlAccessorType;
import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "ConsultarCursoResponse", namespace = "http://una.ac.cr/gimnasio/soap/cursos")
@XmlAccessorType(XmlAccessType.FIELD)
public class ConsultarCursoResponse {

    @XmlElement(required = true)
    private boolean encontrado;
    private Integer id;
    private String descripcion;

    public ConsultarCursoResponse() {
    }

    public boolean isEncontrado() {
        return encontrado;
    }

    public void setEncontrado(boolean encontrado) {
        this.encontrado = encontrado;
    }

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
