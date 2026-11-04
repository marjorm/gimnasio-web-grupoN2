
package una.ac.cr.gimnasio_backend.events;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;


@Component
public class CursoRegistradoObserver {

    private static final Logger logger = LoggerFactory.getLogger(CursoRegistradoObserver.class);

    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void alRegistrarCurso(CursoRegistradoEvent evento) {
        logger.info(
                "Observer: se registró el curso ID {} - {}",
                evento.idCurso(),
                evento.descripcion()
        );
    }
}
