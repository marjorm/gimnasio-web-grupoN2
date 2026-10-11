# Backend del Sistema Web Gimnasio — Guía de pruebas (Entregable 4)

Backend en **Java + Spring Boot** con **JPA/Hibernate** y **MySQL**. Esta guía explica cómo levantarlo y cómo comprobar, paso a paso, que cada funcionalidad responde como se espera.

## Integrantes
- Maria Ramirez Elizondo - Lider
- Roberto Chavarria Garcia - Desarrollador Backend,frontend, documentacion
- Antonio Scala González - Desarrollador Backend,frontend, documentacion
- Cristopher Madrigal Masis - Desarrollador Backend,frontend, documentacion

### Acceso al repositorio
git clone https://github.com/marjorm/gimnasio-web-grupoN2.git

## 1. Requisitos

- XAMPP con **MySQL** encendido (y Apache, si se va a probar también el frontend).
- JDK 26 e IntelliJ IDEA.
- La base de datos `gimnasio` creada en phpMyAdmin.

## 2. Preparar y levantar el backend

1. En **XAMPP Control Panel**, dar **Start** a **MySQL**.
2. Entrar a `http://localhost/phpmyadmin/` y verificar que existe la base `gimnasio`. Si no existe: pestaña **Bases de datos** → nombre `gimnasio` → **Crear**, se recomienda usar la base de datos que se adjunto con el proyecto.
4. Abrir la carpeta `gimnasio-backend` en IntelliJ.
    - Si el botón ▶ está deshabilitado: clic derecho sobre `pom.xml` → **Add as Maven Project**.
5. Ejecutar la clase `GimnasioBackendApplication`.
6. En la consola debe aparecer `Tomcat started on port 8080` y `Started GimnasioBackendApplication`. El backend queda en **http://localhost:8080**.

**Comprobación rápida:** abrir `http://localhost:8080/api/health` → debe responder `{"status":"ok"}`.

## 3. Cómo hacer las pruebas

**GET:** se pueden probar directamente escribiendo la URL en el navegador.

**POST, PUT y DELETE:** se prueban con el cliente HTTP de IntelliJ:

1. Clic derecho en la carpeta del proyecto → **New → HTTP Request** → nombrar el archivo `pruebas.http`.
2. Pegar las peticiones de esta guía. Cada una tiene un botón ▶ verde a la izquierda.
3. El resultado aparece abajo, con el **código de estado** y el JSON de respuesta.

> Para escribir el cuerpo (JSON) de un POST o PUT, lo más seguro es **copiar la forma del JSON que devuelve el GET** de ese mismo recurso y cambiar los valores.

## 4. Recursos disponibles

| Recurso | Ruta base | GET lista | GET por id | POST | PUT | DELETE |
|---|---|---|---|---|---|---|
| Cursos | `/api/cursos` | Sí | `/{id}` | Sí | `/{id}` | `/{id}` |
| Clientes | `/api/clientes` | Sí | `/{cedula}` | Sí | `/{cedula}` | `/{cedula}` |
| Instructores | `/api/instructores` | Sí | `/{id}` | Sí | `/{id}` | `/{id}` |
| Máquinas | `/api/maquinas` | Sí | `/{id}` | Sí | `/{id}` | `/{id}` |
| Rutinas | `/api/rutinas` | Sí | `/{id}` | Sí | `/{id}` | `/{id}` |

## 5. Pruebas del CRUD (ejemplo con Cursos)

El mismo conjunto de pruebas se repite para cada recurso, cambiando la ruta y el cuerpo.

```http
### 1. Listar -> 200 OK
GET http://localhost:8080/api/cursos

### 2. Obtener uno que existe -> 200 OK
GET http://localhost:8080/api/cursos/<id existente>

### 3. Obtener uno que NO existe -> 404 Not Found
GET http://localhost:8080/api/cursos/99999

### 4. Crear -> 201 Created
POST http://localhost:8080/api/cursos
Content-Type: application/json

{ "id": 201, "descripcion": "Pilates avanzado" }

### 5. Actualizar -> 200 OK
PUT http://localhost:8080/api/cursos/201
Content-Type: application/json

{ "id": 201, "descripcion": "Pilates intermedio" }

### 6. Eliminar -> 200 OK o 204 No Content
DELETE http://localhost:8080/api/cursos/201
```

**Verificación en la base de datos:** después de crear, actualizar o eliminar, abrir phpMyAdmin → base `gimnasio` → tabla correspondiente, y comprobar que el cambio quedó guardado.



## 6. Validación de datos

El servidor valida con `@Valid`, `@NotNull`, `@NotBlank`, `@Size`, `@Pattern` y `@Email`. Probar enviando datos incorrectos:

```http
### Descripción vacía -> 400 con el detalle del campo
POST http://localhost:8080/api/cursos
Content-Type: application/json

{ "id": 202, "descripcion": "" }

### Correo con formato inválido -> 400
POST http://localhost:8080/api/clientes
Content-Type: application/json

{ "id": 111111111, "nombre": "Ana", "apellido1": "Mora", "apellido2": "Soto", "email": "esto-no-es-correo", "fechaInscripcion": "2026-10-01" }
```

**Resultado esperado:** código **400** y un mensaje que indica **qué campo** está mal. El registro **no** se guarda.

## 7. Manejo de errores

Un `@ControllerAdvice` captura las excepciones y responde con un mensaje claro. Probar:

```http
### Ruta inexistente -> 500 con mensaje claro
GET http://localhost:8080/api/esto-no-existe

### JSON mal formado -> 400
POST http://localhost:8080/api/cursos
Content-Type: application/json

{ esto no es json

### Id con letras -> 400
GET http://localhost:8080/api/cursos/abc
```

**Resultado esperado:** en ningún caso aparecen trazas de Java (`at una.ac.cr...`), mensajes de MySQL ni la página `Whitelabel Error Page`.


## 8. Arquitectura del backend

```
una.ac.cr.gimnasio_backend
├── controllers/    Reciben las peticiones HTTP y devuelven JSON
├── services/       Interfaces con la lógica de negocio
├── repositories/   Acceso a datos con Spring Data JPA
├── models/         Entidades JPA (@Entity) mapeadas a las tablas
├── exceptions/     Excepciones propias y @ControllerAdvice
```

Flujo de una petición: **Controller → Service → Repository → MySQL**.


## 9. Tecnologías y librerías

- Java 26, Spring Boot 4.1.1
- Spring Web MVC, Spring Data JPA (Hibernate), Bean Validation
- MySQL (XAMPP) con MySQL Connector/J
- Maven
