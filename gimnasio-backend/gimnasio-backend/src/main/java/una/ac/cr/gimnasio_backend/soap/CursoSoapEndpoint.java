
package una.ac.cr.gimnasio_backend.soap;

import org.springframework.ws.server.endpoint.annotation.Endpoint;
import org.springframework.ws.server.endpoint.annotation.PayloadRoot;
import org.springframework.ws.server.endpoint.annotation.RequestPayload;
import org.springframework.ws.server.endpoint.annotation.ResponsePayload;
import una.ac.cr.gimnasio_backend.models.Curso;
import una.ac.cr.gimnasio_backend.services.CursoService;
import una.ac.cr.gimnasio_backend.exceptions.CursoNotFoundException;

@Endpoint
public class CursoSoapEndpoint {

    private static final String NAMESPACE_URI = "http://una.ac.cr/gimnasio/soap/cursos";
    private final CursoService cursoService;

    public CursoSoapEndpoint(CursoService cursoService) {
        this.cursoService = cursoService;
    }


    @PayloadRoot(
            namespace = NAMESPACE_URI, localPart = "ConsultarCursoRequest"
    )
    @ResponsePayload
    public ConsultarCursoResponse consultarCurso(
            @RequestPayload ConsultarCursoRequest request) {

        ConsultarCursoResponse response = new ConsultarCursoResponse();

        try {
            Curso curso = cursoService.obtenerPorId(request.getId());

            response.setEncontrado(true);
            response.setId(curso.getId());
            response.setDescripcion(curso.getDescripcion());

        } catch (CursoNotFoundException e) {
            response.setEncontrado(false);
        }

        return response;
    }

}
