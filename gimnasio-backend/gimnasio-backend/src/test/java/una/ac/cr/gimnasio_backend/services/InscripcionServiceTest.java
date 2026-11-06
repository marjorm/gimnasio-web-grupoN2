package una.ac.cr.gimnasio_backend.services;

import org.junit.jupiter.api.Test;
import org.springframework.web.server.ResponseStatusException;
import una.ac.cr.gimnasio_backend.models.*;
import una.ac.cr.gimnasio_backend.repositories.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import java.time.LocalDate;
import java.util.Optional;

class InscripcionServiceTest {
  private final InscripcionRepository inscripciones=mock(InscripcionRepository.class);
  private final ClienteRepository clientes=mock(ClienteRepository.class);
  private final CursoRepository cursos=mock(CursoRepository.class);
  private final RutinaRepository rutinas=mock(RutinaRepository.class);
  private final PagoRepository pagos=mock(PagoRepository.class);
  private final BajaGimnasioRepository bajas=mock(BajaGimnasioRepository.class);
  private final CursoDetalleRepository detalles=mock(CursoDetalleRepository.class);
  private final InscripcionService servicio=new InscripcionService(inscripciones,clientes,cursos,rutinas,pagos,bajas,detalles);

  @Test void duplicadoRechazadoCon409(){
    when(clientes.existsById(200)).thenReturn(true);
    when(cursos.existsById(1)).thenReturn(true);
    var horario=new CursoDetalle();horario.setCursoId(1);horario.setCupos(10);horario.setHorario("Lunes 18:00");
    when(detalles.bloquearParaInscripcion(1)).thenReturn(Optional.of(horario));
    when(inscripciones.existsByClienteIdAndTipoAndItemIdAndEstado(200,"CURSO",1,"ACTIVA")).thenReturn(true);
    var error=assertThrows(ResponseStatusException.class,()->servicio.registrar(200,"CURSO",1));
    assertEquals(409,error.getStatusCode().value());verify(inscripciones,never()).save(any());
  }
  @Test void cursoInexistenteDevuelve400(){
    when(clientes.existsById(200)).thenReturn(true);
    var e=assertThrows(ResponseStatusException.class,()->servicio.registrar(200,"CURSO",99999));
    assertEquals(400,e.getStatusCode().value());verify(inscripciones,never()).save(any());
  }
  @Test void morosidadBloqueaCancelacion(){
    var inscripcion=new Inscripcion();inscripcion.setId(1L);inscripcion.setClienteId(200);
    when(inscripciones.findById(1L)).thenReturn(Optional.of(inscripcion));
    when(pagos.existsByClienteIdAndEstadoAndFechaVencimientoLessThanEqual(eq(200),eq("PENDIENTE"),any(LocalDate.class))).thenReturn(true);
    var e=assertThrows(ResponseStatusException.class,()->servicio.cancelar(1L,200,false));
    assertEquals(409,e.getStatusCode().value());verify(inscripciones,never()).save(any());
  }
  @Test void noPuedeCancelarInscripcionAjena(){
    var inscripcion=new Inscripcion();inscripcion.setId(1L);inscripcion.setClienteId(201);
    when(inscripciones.findById(1L)).thenReturn(Optional.of(inscripcion));
    var e=assertThrows(ResponseStatusException.class,()->servicio.cancelar(1L,200,false));
    assertEquals(403,e.getStatusCode().value());verify(inscripciones,never()).save(any());
  }
  @Test void cuposAgotadosRechazaAltaCon409(){
    when(clientes.existsById(200)).thenReturn(true);
    when(cursos.existsById(1)).thenReturn(true);
    var d=new CursoDetalle();d.setCursoId(1);d.setHorario("Martes 18:00");d.setCupos(1);
    when(detalles.bloquearParaInscripcion(1)).thenReturn(Optional.of(d));
    when(inscripciones.countByTipoAndItemIdAndEstado("CURSO",1,"ACTIVA")).thenReturn(1L);
    var e=assertThrows(ResponseStatusException.class,()->servicio.registrar(200,"CURSO",1));
    assertEquals(409,e.getStatusCode().value());verify(inscripciones,never()).save(any());
  }
  @Test void cursoSinProgramarRechazaAlta(){
    when(clientes.existsById(200)).thenReturn(true);
    when(cursos.existsById(1)).thenReturn(true);
    var d=new CursoDetalle();d.setCursoId(1);d.setHorario("Pendiente de programación");d.setCupos(0);
    when(detalles.bloquearParaInscripcion(1)).thenReturn(Optional.of(d));
    var e=assertThrows(ResponseStatusException.class,()->servicio.registrar(200,"CURSO",1));
    assertEquals(409,e.getStatusCode().value());
  }
}
