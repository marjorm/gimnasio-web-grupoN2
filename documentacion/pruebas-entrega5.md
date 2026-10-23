# Entregable 5 - Integrante 4

## Componentes preparados

- AuthContext.jsx: estado de autenticación compartido.
- ProtectedRoute.jsx: protección de vistas privadas.
- Login.jsx: pantalla informativa de acceso.
- EstadoSesion.jsx: visualización del estado de sesión.

## Estado de autenticación

En la revisión inicial del backend no se identificó un
mecanismo real de inicio de sesión ni de verificación de sesión.

Por seguridad:

- No se simula autenticación con localStorage.
- No se inventan endpoints de autenticación.
- Las rutas privadas deniegan el acceso por defecto.
- La función opcional comprobarSesion deberá conectarse
  exclusivamente a una verificación real del backend.
- El backend deberá controlar también las autorizaciones:
  ocultar una ruta en React no protege los endpoints REST.

## Integración pendiente

- Integrante 1: agregar AuthProvider y rutas de Login y
  Mantenimiento en App.jsx o main.jsx.
- Integrantes 2 y 3: integrar servicios REST y formularios.
- Equipo: implementar o documentar autenticación real.

## Pruebas pendientes

- [x] npm ci
- [x] npm run build
- [x] Renderizar AuthProvider en React Router
- [x] Confirmar que Mantenimiento redirige a Login
- [x] Confirmar que el acceso no utiliza localStorage
- [ ] Revisar integración de los Pull Requests
- [ ] Verificar el backend con Java 26
- [ ] Verificar operaciones contra MySQL
- [ ] Actualizar README definitivo
- [ ] Adjuntar evidencias y capturas

No marcar como completadas las pruebas hasta ejecutarlas.
## Evidencia de validacion funcional

### Validaciones automaticas

- npm ci: completado correctamente.
- npm run lint: 0 advertencias y 0 errores.
- npm run build: compilacion exitosa.
- React Router: AuthProvider integrado en App.jsx.
- ProtectedRoute: integrado en la ruta /mantenimiento.

### Validacion manual reportada

- Se ingreso a /mantenimiento sin sesion autenticada.
- La aplicacion redirigio automaticamente a /login.
- No se observaron errores en la consola del navegador.
- El formulario de login real no esta habilitado porque
  todavia no existe autenticacion de backend verificada.

### Limitaciones pendientes

- No existe evidencia de autenticacion real en Spring Boot.
- Proteger una ruta React no protege los endpoints del backend.
- Las operaciones REST y la persistencia en MySQL deben
  verificarse cuando se integren los demas componentes.
- Se requiere integrar los Pull Requests del equipo.
- Las capturas y evidencia del PR deben agregarse al cierre.

Las pruebas del navegador fueron confirmadas manualmente
por el integrante 4. Las pruebas pendientes no se presentan
como completadas.
