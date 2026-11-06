# Matriz de cumplimiento técnico — Entregables 1 al 6

**Sistema:** Sistema Web para Gimnasio · Grupo 2, Universidad Nacional.
**Repositorio:** https://github.com/marjorm/gimnasio-web-grupoN2
**Rama:** feature/entregable6-integracion-final
**Entorno:** JDK 17, Spring Boot 4.1.1, React/Node.js, MariaDB.

## Cobertura del proyecto

| Entregable | Desarrollo y evidencia disponible |
| --- | --- |
| E1: Constitución y entorno | Repositorio en GitHub, rama main protegida, arquitectura Spring/React/MariaDB, esquema relacional y scripts. Incorporar nombres y acta firmada del equipo. |
| E2: HTML5 y CSS3 | Inicio, Contactos, Servicios, Blog, Cursos, Máquinas e Instructores. Recursos de imagen y estilos externos; presentación visual unificada. |
| E3: JavaScript cliente | Formularios, manejo de eventos, fetch, async/await, validaciones y preferencias en almacenamiento web. |
| E4: Java/Spring | MVC, JPA/Hibernate, controladores, servicios, repositorios, Singleton, Observer, Iterator, CRUD y excepciones centralizadas. |
| E5: React SPA | Rutas públicas y protegidas, Context para sesión, componentes reutilizables, modelos y servicios HTTP, tres roles. |
| E6: Integración y entrega | Login, REST/SOAP, inscripción, pagos, baja, contactos, catálogo, programación de cursos, SQL, manual, informe, capturas y PR. |

## Resultados confirmados

- Nueve pruebas automatizadas del backend aprobadas en ejecuciones registradas.
- Compilación Vite aprobada y análisis React con cero errores en los controles anteriores.
- Pruebas HTTP correctas de registro, login, sesiones, roles, contactos, inscripciones, duplicados, mora, pagos, cancelación, baja y CRUD de cursos.
- Auditoría de las vistas públicas y privadas: 26 capturas, sin imágenes rotas y sin mensajes de error visibles.
- Control de acceso por cliente e instructor observado en las pruebas de navegación y API.
- Preparación de base independiente `gimnasio_entregable6_test` con doce tablas; base original conservada.

## Reglas técnicas incorporadas

- Capas MVC, Singleton de Spring, eventos Observer e Iterator en servicios.
- Formularios React con servicios REST, validaciones cliente/servidor, manejo de respuestas 400/401/403/409.
- Sesiones HTTP, hashes BCrypt, acceso por roles, CORS y cabeceras de seguridad.
- Inscripciones con control de duplicidad y pago; disponibilidad por cupos e integración con programación de cursos.
- Mantenimiento administrativo de clientes, cursos, máquinas, rutinas e historial de cursos.
- Scripts de instalación, migración SQL y documentación técnica y manual de usuario.

## Datos y evidencias que debe aportar el equipo

- Nombres completos de integrantes, acta de constitución y aportes de cada persona en GitHub Contributors.
- Capturas del listado de Pull Requests y de Issues para adjuntar al informe institucional.
- Datos oficiales de contacto y redes sociales; actualmente hay referencias de demostración.
- Fotografías propias cuando se requieran imágenes específicas de máquinas, instructores y cursos.
- Decisión documentada de usar JDK 17; el enunciado inicial cita JDK 26.
- Horarios de los scripts de demostración: no atribuirlos a una programación comercial real.
- Entrega en aula virtual y defensa ante la profesora conforme a las instrucciones del curso.

La presente matriz describe el alcance funcional y la evidencia registrada del proyecto. No sustituye la evaluación oficial ni asigna una calificación.
