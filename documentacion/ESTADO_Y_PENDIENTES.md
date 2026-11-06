# Validación del entregable 6 — estado del paquete

El paquete incorpora funcionalidades adicionales y está destinado a la rama `feature/entregable6-integracion-final`, **no** a `main` directamente.

## Verificaciones obligatorias pendientes en el equipo Windows

1. Crear la rama desde `origin/main` que ya contiene PR #17 y #18.
2. Crear `gimnasio_entregable6_test` mediante `scripts/preparar-entregable6.ps1` antes de iniciar el backend actualizado.
3. Ejecutar Maven `clean verify` y Vite `build` + `lint`.
4. Iniciar Spring Boot con `--spring.datasource.url=jdbc:mysql://localhost:3306/gimnasio_entregable6_test?...` y Vite en 5173.
5. Comprobar usuarios, historial, inscripciones de curso/rutina, bloqueo por morosidad, desinscripción, contacto, CRUD, seguridad, persistencia.
6. Actualizar la documentación técnica y manual del usuario con **capturas reales de la versión final**, no de las pantallas anteriores.
7. Revisar el enunciado completo y marcar cada requisito con evidencia; no presumir conformidad por compilación.
8. Crear PR propio, revisión y merge aprobado. Evidencia de Issues, Contributors y Pull Requests.

Nota: las fotos de instalaciones del repositorio son del proyecto. Los horarios/cupos de cursos necesitan confirmación de datos reales o ajustarse en mantenimiento.
