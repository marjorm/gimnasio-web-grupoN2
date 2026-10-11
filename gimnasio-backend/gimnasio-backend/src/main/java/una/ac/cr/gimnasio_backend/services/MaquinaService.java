package una.ac.cr.gimnasio_backend.services;

import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import una.ac.cr.gimnasio_backend.models.Maquina;
import una.ac.cr.gimnasio_backend.repositories.MaquinaRepository;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Service
@Scope(ConfigurableBeanFactory.SCOPE_SINGLETON)
public class MaquinaService {
    private final MaquinaRepository repository;

    public MaquinaService(MaquinaRepository repository) {
        this.repository = repository;
    }

    @Transactional(readOnly = true)
    public List<Maquina> listar() {
        List<Maquina> r=new ArrayList<>();
        Iterator<Maquina> it=repository.findAll().iterator();
        while(it.hasNext()) r.add(it.next());
        return r;
    }

    @Transactional(readOnly = true)
    public Maquina obtener(Integer id) {
        return repository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Máquina no encontrada"));
    }

    @Transactional
    public Maquina crear(Maquina x) {
        if(repository.existsById(x.getId())) throw new ResponseStatusException(HttpStatus.CONFLICT, "Ya existe una máquina con ese ID");
        return repository.save(x);
    }

    @Transactional
    public Maquina actualizar(Integer id, Maquina x) {
        Maquina e=obtener(id);
        e.setDescripcion(x.getDescripcion());
        return repository.save(e);
    }

    @Transactional public void eliminar(Integer id) {
        repository.delete(obtener(id));
    }
}