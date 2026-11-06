# Evidencias finales del sistema web del gimnasio

La captura automatizada obtuvo **31 imagenes** de las vistas publicas, el
administrador, el cliente, el instructor, el mantenimiento y las vistas moviles.

El backend se valido con Java 17 y once pruebas Maven; React supero lint y build.
La validacion funcional de MariaDB aprobo **45 aserciones HTTP**: CRUD de los cinco
modulos, cupos agotados, cancelacion y liberacion de plazas, llaves inmutables y permisos.

Los HTTP 401 esperados al consultar sesiones anonimas se clasificaron aparte.
Ningun log de servidor abierto forma parte del ZIP de entrega.

Se uso exclusivamente la base de ensayo gimnasio_entregable6_test.