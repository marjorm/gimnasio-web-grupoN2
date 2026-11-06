# Cierre de auditoría E1–E6 — Alcance y criterios verificables

**Repositorio:** https://github.com/marjorm/gimnasio-web-grupoN2
**Rama:** `feature/entregable6-integracion-final`
**Java utilizado:** JDK 17, por decisión del equipo. El texto original del entregable 1 menciona JDK 26: esta diferencia debe declararse con transparencia a la profesora.

## Verificaciones incluidas en la validación final

- React `lint` y `build`: sin errores, imágenes uniformes y mantenimiento con columnas estructuradas, no representaciones JSON completas.
- Maven `clean verify` en **copia temporal aislada**: mantiene intacto el JAR bloqueado por procesos de Windows.
- Base `gimnasio_entregable6_test` únicamente: instalación de seis horarios marcados **DEMO**, sin afirmar que sean horarios comerciales del gimnasio.
- Cursos: capacidad real, plazas libres calculadas de las inscripciones activas, bloqueo pesimista para evitar sobreventa, rechazo con 409 de cupos agotados y recuperación al cancelar.
- Rechazo de modificaciones de ID en curso, máquina y cliente; prohibición de cambiar las relaciones de rutinas e historial.
- Prueba de escritura de los cinco módulos exigidos: clientes, cursos, máquinas, rutinas e historial, con POST, PUT y DELETE; prohibición de eliminar registros relacionados.
- Inicio de sesión y autorización de roles; consola previa con respuestas 401 para sesión anónima consideradas esperables y no evidencia de fallo.
- React servido desde Node/Vite, backend desde Spring Boot y persistencia ORM en MariaDB.

## Aún requiere evidencia humana o datos oficiales

1. **Acta de constitución del grupo firmada**, integrantes, correos institucionales y evidencias de participación en GitHub Contributors/Issues/Pull Requests.
2. **Fotos propias y específicas** de cada instructor, máquina y curso, cuando la profesora requiera fotografías reales. Las ilustraciones actuales son recursos referenciales y mantienen tamaño uniforme.
3. **Datos reales del gimnasio** (correo, teléfono y URL exacta de perfiles sociales). Los que figuran como demostración no son perfiles verificados.
4. **Prueba visual móvil y tableta**, más las capturas finales tras las correcciones, para actualizar el manual si cambia una pantalla.
5. **Defensa del proyecto y entrega en aula virtual**, que requieren acciones del equipo y no pueden inferirse de una prueba automatizada.
6. **Versión JDK 26** solicitada literalmente en el entregable 1: se conserva JDK 17 por decisión del equipo; no afirmar cumplimiento exacto de esa versión.

## Git y empaquetado

El script de publicación agregará `.gitattributes` para tratar PDF e imágenes como binarios, corregirá solo espacios finales de SQL y Markdown, y ejecutará `git diff --cached --check` antes de crear un commit. No se hace `push` a `main`: se publica la rama para crear Pull Request y registrar aprobación.

**No se certifica automáticamente una nota académica ni el 100 % de la rúbrica.** Los controles verifican comportamiento y dejan explícita la evidencia todavía pendiente.
