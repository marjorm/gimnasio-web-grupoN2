package una.ac.cr.gimnasio_backend.services;

import org.junit.jupiter.api.Test;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.web.server.ResponseStatusException;
import una.ac.cr.gimnasio_backend.models.Curso;
import una.ac.cr.gimnasio_backend.repositories.CursoRepository;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class CursoServiceTest {

    @Test
    void cursoDuplicadoDevuelve409SinGuardarNiPublicarEvento() {
        CursoRepository repository = mock(CursoRepository.class);
        ApplicationEventPublisher publisher = mock(ApplicationEventPublisher.class);
        CursoService service = new CursoService(repository, publisher);

        Curso curso = new Curso();
        curso.setId(1);
        curso.setDescripcion("yoga");

        when(repository.existsById(1)).thenReturn(true);

        ResponseStatusException error = assertThrows(
            ResponseStatusException.class,
            () -> service.guardarCurso(curso)
        );

        assertEquals(409, error.getStatusCode().value());
        verify(repository, never()).save(any(Curso.class));
        verifyNoInteractions(publisher);
    }

    @Test
    void idInvalidoDevuelve400SinConsultarRepositorio() {
        CursoRepository repository = mock(CursoRepository.class);
        ApplicationEventPublisher publisher = mock(ApplicationEventPublisher.class);
        CursoService service = new CursoService(repository, publisher);

        Curso curso = new Curso();
        curso.setId(0);
        curso.setDescripcion("yoga");

        ResponseStatusException error = assertThrows(
            ResponseStatusException.class,
            () -> service.guardarCurso(curso)
        );

        assertEquals(400, error.getStatusCode().value());
        verifyNoInteractions(repository, publisher);
    }
}
