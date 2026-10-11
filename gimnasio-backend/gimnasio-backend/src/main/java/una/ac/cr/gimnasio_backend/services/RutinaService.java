package una.ac.cr.gimnasio_backend.services;

import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import una.ac.cr.gimnasio_backend.models.*;
import una.ac.cr.gimnasio_backend.repositories.*;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Service
@Scope(ConfigurableBeanFactory.SCOPE_SINGLETON)
public class RutinaService {
    private final RutinaRepository rutinas;
    private final ClienteRepository clientes;
    private final InstructorRepository instructores;
    private final MaquinaRepository maquinas;

    public RutinaService(RutinaRepository rutinas, ClienteRepository clientes, InstructorRepository instructores, MaquinaRepository maquinas) {
        this.rutinas = rutinas;
        this.clientes = clientes;
        this.instructores = instructores;
        this.maquinas = maquinas;
    }

    @Transactional(readOnly = true) public List<Rutina> listar() {
        List<Rutina> salida = new ArrayList<>();
        Iterator<Rutina> it = rutinas.findAll().iterator();
        while (it.hasNext()) salida.add(it.next());
        return salida;
    }

    @Transactional(readOnly = true) public Rutina obtener(Integer id) {
        return rutinas.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Rutina no encontrada"));
    }

    @Transactional public Rutina crear(RutinaRequest dto) {
        if (rutinas.existsById(dto.getId())) throw new ResponseStatusException(HttpStatus.CONFLICT, "Ya existe una rutina con ese ID");
        return rutinas.save(mapear(new Rutina(), dto));
    }

    @Transactional public Rutina actualizar(Integer id, RutinaRequest dto) {
        Rutina actual = obtener(id);
        if (!id.equals(dto.getId())) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El ID de la ruta debe coincidir con el ID del cuerpo JSON");
        return rutinas.save(mapear(actual, dto));
    }

    @Transactional public void eliminar(Integer id) { rutinas.delete(obtener(id)); }
    private Rutina mapear(Rutina r, RutinaRequest d) {
        if (!maquinas.existsById(d.getMaquina())) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La máquina indicada no existe");
        r.setId(d.getId());
        r.setCliente(clientes.findById(d.getClienteId()).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "El cliente indicado no existe")));
        r.setInstructor(instructores.findById(d.getInstructorId()).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "El instructor indicado no existe")));
        r.setMaquina(d.getMaquina());
        r.setFecha_Rutina(d.getFecha());
        r.setHoras(d.getHoras());
        return r;
    }
}