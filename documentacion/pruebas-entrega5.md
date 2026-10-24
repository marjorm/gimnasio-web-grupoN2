# Entregable 5 - Integrante 4

## Objetivo

Integrar los componentes del Sistema Web para Gimnasio,
incorporando autenticación compartida, rutas protegidas,
servicios REST, formularios y validaciones de frontend.

## Integración del equipo

- PR #13: servicios REST y páginas de consulta, fusionado.
- PR #14: formularios y mantenimiento, fusionado.
- PR #15: AuthContext, rutas protegidas e integración final.

La integración se realizó directamente en la rama
feature/context-integracion.

## Funcionalidades integradas

- Inicio y Servicios.
- Blog.
- Consulta de Cursos.
- Consulta de Rutinas.
- Consulta de Máquinas.
- Consulta de Instructores.
- Contactos con formulario de validación.
- Inscripción con formulario de validación.
- Login informativo.
- Mantenimiento de Clientes bajo ruta protegida.

## Autenticación

Se integraron AuthProvider, AuthContext y ProtectedRoute.

La ruta /mantenimiento deniega el acceso por defecto cuando
no existe una sesión autenticada.

No se utilizan credenciales ficticias ni sesiones simuladas.

El backend todavía no proporciona un mecanismo de
autenticación real verificado.

La protección de rutas en React no protege por sí sola
los endpoints REST del servidor.

## Formularios

### Mantenimiento de Clientes

Utiliza los campos obligatorios del modelo Java Cliente.

Se conecta a clienteService para consultar, crear,
actualizar y eliminar clientes.

Las operaciones contra una base MySQL real no han sido
validadas de extremo a extremo.

### Inscripción

Carga cursos y rutinas utilizando los servicios REST.

Valida los datos ingresados, pero no registra una
inscripción porque falta el servicio correspondiente.

### Contacto

Valida nombre, correo electrónico y mensaje.

No envía información a un servidor porque todavía
no existe un servicio de contacto implementado.

Los formularios no muestran confirmaciones falsas.

## Pruebas realizadas

### Frontend

- Compilación de componentes React con Vite.
- Oxlint sin errores ni advertencias.
- Compilación general Vite exitosa.
- Renderizado de las páginas de la aplicación.
- Comprobación de que Mantenimiento no renderiza su
  contenido privado durante una prueba sin sesión.
- Verificación estática de AuthProvider y ProtectedRoute.
- Verificación de ausencia de almacenamiento de sesiones
  simuladas en AuthContext.

Las pruebas de renderizado no sustituyen la verificación
de redirecciones en un navegador real.

### Backend

Durante la revisión del PR #13:

- Spring Boot compiló con Java 17.
- La prueba del contexto se ejecutó satisfactoriamente.
- Se utilizó H2 en memoria exclusivamente para pruebas.

La persistencia contra MySQL real no quedó validada.

## Limitaciones y riesgos

- Falta autenticación real en Spring Boot.
- Falta autorización en los endpoints REST.
- Las vistas públicas de Rutinas pueden exponer datos
  asociados a clientes si la API no restringe el acceso.
- No se debe utilizar información personal real sin
  controles de acceso adecuados.
- Inscripción y Contacto no tienen backend de persistencia.
- Mantenimiento no puede habilitarse para uso real sin
  integrar un verificador de sesión auténtico.

## Verificaciones pendientes

- Pruebas de navegación completas en navegador.
- Confirmar redirección a /login sin sesión.
- Pruebas REST con MySQL.
- Pruebas de crear, actualizar y eliminar clientes.
- Autenticación y autorización del backend.
- Pruebas completas de inscripción y contacto cuando
  existan los servicios correspondientes.
- Capturas adicionales que solicite el profesor.

## Conclusión

La integración frontend del Entregable 5 está compilada
y sus componentes principales se encuentran conectados.

Las verificaciones pendientes se documentan expresamente.

No se considera implementada la autenticación real ni
se afirma que el sistema esté preparado para producción.