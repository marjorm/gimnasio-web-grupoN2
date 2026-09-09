# Sistema Web Gimnasio - Grupo 2

Proyecto de Programación 4 (II Semestre 2026) - Universidad Nacional.

El proyecto consiste en desarrollar un sistema web para la gestión de un gimnasio utilizando HTML5, CSS3, JavaScript, Java/Spring, React, servicios web y autenticación/autorización según las entregas definidas en el curso.

## Integrantes

- Maria Ramirez Elizondo - Líder / desarrollo
- Roberto Chavarria Garcia - Desarrollo backend, frontend y documentación
- Antonio Scala González - Desarrollo backend, frontend y documentación
- Cristopher Madrigal Masis - Desarrollo backend, frontend y documentación

## Requisitos del ambiente

- XAMPP (Apache + MySQL)
- JDK 26
- IntelliJ IDEA
- Node.js LTS, requerido para el frontend React de entregas posteriores

## Entregable 2 - Frontend estático HTML5 + CSS3

Las páginas del Entregable 2 se encuentran en la raíz del repositorio:

- `index.html`
- `contactos.html`
- `servicios.html`
- `blog.html`
- `inscripcion.html`
- `cursos.html`
- `rutinas.html`
- `maquinas.html`
- `instructores.html`
- `mantenimiento.html`
- `desinscribirse.html`

Los estilos se cargan desde `css/style.css` y `css/style2.css`. No es necesario ejecutar React ni Spring Boot para revisar el Entregable 2.

### Ejecutar el Entregable 2 con XAMPP/Apache

1. Instalar XAMPP y abrir **XAMPP Control Panel**.
2. Iniciar el servicio **Apache**.
3. Copiar o clonar el repositorio dentro de la carpeta `C:\xampp\htdocs\gimnasio-web-grupoN2`.
4. Abrir el navegador y visitar `http://localhost/gimnasio-web-grupoN2/`.
5. Verificar que el menú permita navegar por Inicio, Contactos, Servicios y Blog y por todas las opciones del submenú Servicios.

No se deben abrir las páginas mediante doble clic sobre los archivos HTML; la aplicación estática debe servirse mediante Apache.

## Backend inicial - Entregable 1

1. Abrir `gimnasio-backend/gimnasio-backend` en IntelliJ IDEA.
2. Ejecutar `GimnasioBackendApplication`.
3. Visitar `http://localhost:8080/api/health`.
4. La respuesta esperada es `{"status":"ok"}`.

## Frontend React inicial - Entregable 1

La carpeta `gimnasio-frontend` contiene el proyecto React inicial que se utilizará en una entrega posterior para convertir las vistas principales en una SPA.

```bash
cd gimnasio-frontend
npm install
npm run dev
```

## Flujo de trabajo con GitHub

Los cambios deben realizarse en ramas de trabajo y enviarse a la rama principal mediante Pull Request. La rama principal no debe recibir commits directos. Cada integrante debe mantener contribuciones sustantivas y verificables en el repositorio durante cada entregable.
