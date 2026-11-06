package una.ac.cr.gimnasio_backend.soap;

import jakarta.xml.bind.annotation.XmlAccessType;
import jakarta.xml.bind.annotation.XmlAccessorType;
import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "ConsultarCursoRequest", namespace = "http://una.ac.cr/gimnasio/soap/cursos")
@XmlAccessorType(XmlAccessType.FIELD)
public class ConsultarCursoRequest {

    @XmlElement(required = true)
    private int id;

    public ConsultarCursoRequest() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}
