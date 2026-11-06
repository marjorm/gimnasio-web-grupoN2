# Matriz de cumplimiento — Entregables 1 a 6

Repositorio: https://github.com/marjorm/gimnasio-web-grupoN2
Rama actual: `feature/entregable6-integracion-final`
Base de validación: `gimnasio_entregable6_test` (12 tablas).
Estado del informe: 5 de noviembre de 2026 (UTC-6).

Leyenda: **PASS** = prueba específica superada; **IMPLEMENTADO POR VERIFICAR** = código presente, pero no se ha demostrado todo el requisito; **PENDIENTE** = evidencia o implementación incompleta.

| Entregable | Requisito | Estado y evidencia |
|---|---|---|
| E1 | Servidor web/Node y XAMPP MySQL | PASS en entorno de desarrollo: Node/Vite y Spring, MariaDB conectada |
| E1 | Spring Boot, health y React | PASS HTTP `/api/health` y compilación |
| E1 | JDK 26 + IntelliJ | PENDIENTE confirmar enunciado y demostrar; el proyecto utiliza Java 17 |
| E1 | Modelo de datos y acta firmada | Modelo SQL verificado; **acta firmada y captura de IDE pendientes de adjuntar** |
| E2 | HTML5 semántico, CSS externos, responsive | IMPLEMENTADO POR VERIFICAR; revisar todos los componentes y erradicar estilos inline |
| E2 | Menú público, fotos instalaciones | IMPLEMENTADO; fotografías copiadas al directorio public; pendiente revisión visual |
| E2 | Contacto, teléfonos y perfiles sociales | Formulario persistente PASS; teléfono/correo son de demostración; perfiles oficiales no confirmados |
| E2 | Servicios y siete subopciones | IMPLEMENTADO; pendiente validar navegación y menús |
| E2 | Blog y enlaces seguros | IMPLEMENTADO; pendiente verificar en navegador |
| E3 | Validación HTML5/JS, eventos, DOM | IMPLEMENTADO POR VERIFICAR en cada formulario y vista |
| E3 | GET/POST Fetch async/await y try/catch | IMPLEMENTADO; validación HTTP de integración PASS |
| E3 | localStorage y sessionStorage | IMPLEMENTADO en Preferencias.jsx para vista compacta y última ruta; verificar navegador |
| E4 | Spring MVC + servicios + JPA + MySQL | PASS en compilación y HTTP; 12 repositorios Spring Data detectados |
| E4 | CRUD GET/POST/PUT/DELETE y códigos correctos | CRUD de cursos PASS; todos los módulos por probar UI+API |
| E4 | Modelo con todas las anotaciones indicadas | IMPLEMENTADO EN PARTE; auditar asociaciones y @GeneratedValue según especificación |
| E4 | Singleton, Observer e Iterator | IMPLEMENTADOS en servicios y eventos; se documentan en PDF |
| E4 | @ControllerAdvice y validaciones | IMPLEMENTADO; pruebas de duplicado, autorización y mora PASS |
| E5 | React SPA, Context, rutas privadas, componentes | PASS compilación; probar navegación visual de tres roles |
| E5 | separación models/ y servicios/interfaces | Carpeta `models` del frontend solo contiene README; **corregir explícitamente** |
| E6 | Integración web+backend+MariaDB | PASS pruebas HTTP sobre base aislada; falta demostración UI |
| E6 | autenticación de tres roles y BCrypt | PASS HTTP de roles en PR18; E6 login admin y cliente PASS; instructor en E6 pendiente retest |
| E6 | seguridad CORS y cabeceras | CORS configurado; X-Frame-Options y nosniff PASS HTTP |
| E6 | SQL desde cero + datos de prueba | PASS 12 tablas; se generó GIMNASIO_ENTREGABLE6.sql localmente |
| E6 | documentación técnica PDF | ARCHIVO GENERADO; revisar y agregar evidencia de diagramas si se solicita versión gráfica |
| E6 | manual usuario PDF con capturas de todas las vistas | MANUAL FINAL GENERADO (19 pÃ¡ginas, 26 capturas de la versiÃ³n anterior al ajuste visual); recapturar 5 vistas pÃºblicas despuÃ©s del CSS |
| E6 | README paso a paso | README del PR17 existe; **PENDIENTE actualizar para E6** |
| E1–E6 | GitHub Issues, PR, revisión, protección main y contribuciones por persona | PR17 y PR18 aprobados y fusionados; rama E6 aún sin PR. Evidencia Contributors/Issues pendiente |
| E6 | defensa del proyecto | PENDIENTE coordinar con profesora |

**No afirmar cumplimiento 100% hasta cerrar los pendientes de la última columna.**
