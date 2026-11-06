package una.ac.cr.gimnasio_backend.soap;

import jakarta.xml.bind.JAXBContext;
import org.junit.jupiter.api.Test;
import org.w3c.dom.Document;

import javax.xml.parsers.DocumentBuilderFactory;
import org.xml.sax.InputSource;
import java.io.StringReader;
import java.io.StringWriter;

import static org.junit.jupiter.api.Assertions.*;

class CursoSoapContratoTest {

    private static final String NS =
            "http://una.ac.cr/gimnasio/soap/cursos";

    @Test
    void interpretaIdConNamespaceCalificado() throws Exception {
        String xml =
                "<cur:ConsultarCursoRequest xmlns:cur=\"" + NS + "\">" +
                "<cur:id>1</cur:id>" +
                "</cur:ConsultarCursoRequest>";

        JAXBContext context =
                JAXBContext.newInstance(ConsultarCursoRequest.class);

        Object resultado = context.createUnmarshaller()
                .unmarshal(new StringReader(xml));

        assertInstanceOf(ConsultarCursoRequest.class, resultado);
        assertEquals(1, ((ConsultarCursoRequest) resultado).getId());
    }

    @Test
    void generaRespuestaConNamespaceCalificado() throws Exception {
        ConsultarCursoResponse respuesta = new ConsultarCursoResponse();
        respuesta.setEncontrado(true);
        respuesta.setId(1);
        respuesta.setDescripcion("yoga");

        JAXBContext context =
                JAXBContext.newInstance(ConsultarCursoResponse.class);

        StringWriter salida = new StringWriter();
        context.createMarshaller().marshal(respuesta, salida);

        DocumentBuilderFactory factory =
                DocumentBuilderFactory.newInstance();
        factory.setNamespaceAware(true);

        Document documento = factory.newDocumentBuilder()
                .parse(new InputSource(new StringReader(salida.toString())));

        assertEquals(
                NS,
                documento.getDocumentElement().getNamespaceURI()
        );

        assertEquals(
                1,
                documento.getElementsByTagNameNS(NS, "encontrado").getLength()
        );

        assertEquals(
                "true",
                documento.getElementsByTagNameNS(NS, "encontrado")
                        .item(0).getTextContent()
        );

        assertEquals(
                1,
                documento.getElementsByTagNameNS(NS, "id").getLength()
        );
    }
}
