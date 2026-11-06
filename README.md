# Sistema Web Gimnasio — Instalación y validación

Proyecto académico de la Universidad Nacional. Aplicación web con frontend React/Vite, API REST en Spring Boot, persistencia con JPA y MariaDB/MySQL, y consulta de cursos mediante SOAP.

## Integrantes

- María Ramírez Elizondo
- Roberto Chavarría García
- Antonio Scala González
- Cristopher Madrigal Masis

## Estado de validación

En la rama del PR #17 se comprobó: compilación Java 17, arranque Spring Boot, conexión a MariaDB de XAMPP, REST para cursos, publicación WSDL y XSD, consulta SOAP de curso existente/inexistente y autenticación por sesión con rechazo HTTP 409 de un curso duplicado. Las cinco pruebas automatizadas del backend terminaron correctamente. **Estas comprobaciones no sustituyen las pruebas integrales del frontend ni de todos los CRUD y roles**, previstas para la revisión del PR #18 y la fase de pruebas final.

## 1. Requisitos

- **Java JDK 17** y **Maven** disponibles desde la terminal (`java -version`, `mvn -version`). El `pom.xml` configura Java 17; no es necesario Java 26.
- **XAMPP** con MariaDB/MySQL iniciado en TCP **3306**. En el entorno de validación se utilizó MariaDB 10.4.32.
- **Node.js y npm** para el frontend; se utilizó Node 22.14.0 y npm 10.9.2 durante la preparación del entorno. Vite 8 requiere una versión de Node compatible.
- PowerShell 5.1 o posterior (para el asistente de importación incluido).

No es necesario iniciar Apache para ejecutar React mediante Vite. Apache sí puede usarse para phpMyAdmin.

## 2. Obtener el proyecto

```powershell
git clone https://github.com/marjorm/gimnasio-web-grupoN2.git
cd gimnasio-web-grupoN2
```

Si se está revisando un PR, debe utilizarse la rama correspondiente en lugar de asumir que `main` ya contiene sus cambios.

Estructura relevante:

```text
GIMNASIO.sql                              # Script original con datos + ejercicios SQL
scripts/preparar-mariadb.ps1             # Importador seguro para MariaDB de XAMPP
gimnasio-backend/gimnasio-backend/pom.xml
gimnasio-frontend/package.json
```

## 3. Preparar la base de datos

1. Abrir XAMPP e iniciar **MySQL** en el puerto 3306.
2. Si XAMPP indica `10048` o que el puerto está ocupado, identificar primero el proceso: `Get-NetTCPConnection -LocalPort 3306 -State Listen`. Es posible que exista un servicio de Windows llamado `MySQL80`. Detenerlo **solo si no lo usan otras aplicaciones**, desde PowerShell elevado: `Stop-Service MySQL80`. No borrar archivos de `mysql/data`.
3. En la raíz del repositorio, ejecutar:

```powershell
.\scripts\preparar-mariadb.ps1
```

El asistente asume la instalación habitual `C:\xampp\mysql\bin\mysql.exe`, usuario `root` sin contraseña y puerto 3306. **Nunca sobrescribe una base de datos existente.** Si `gimnasio` ya existe, verifica únicamente su estructura y los datos de referencia.

El archivo original `GIMNASIO.sql` no crea la base de datos e incluye ejercicios con sintaxis Oracle en su tramo final. Por ello, el asistente genera una **copia temporal** con las definiciones de tablas y sus datos iniciales, y la importa únicamente cuando la base de destino no existe. El original no se altera.

Resultado de referencia: **7 tablas, 6 cursos y 26 usuarios**. Para comprobar también la creación desde cero sin modificar `gimnasio`, usar una base de prueba independiente:

```powershell
.\scripts\preparar-mariadb.ps1 -NombreBase gimnasio_pr17_readme_test
```

Este último comando **crea** una base de datos adicional de prueba si todavía no existe; no la elimina automáticamente.

Si el usuario `root` tiene contraseña, se necesita adaptar la autenticación en un entorno local seguro. No incluir contraseñas en Git ni en el README. El ejemplo de `application.properties` presupone el `root` sin contraseña de XAMPP.

## 4. Ejecutar y comprobar el backend

Abrir una terminal en la raíz del repositorio:

```powershell
cd .\gimnasio-backend\gimnasio-backend
mvn -B -ntp clean verify
java -jar .\target\gimnasio-backend-0.0.1-SNAPSHOT.jar
```

El backend usa por defecto `http://localhost:8080` y la base `gimnasio` (`spring.datasource.url` en `application.properties`). Si el puerto 8080 está ocupado, para **pruebas aisladas** se puede ejecutar:

```powershell
java -jar .\target\gimnasio-backend-0.0.1-SNAPSHOT.jar --server.port=18080
```

**Advertencia:** el cliente React actual utiliza `http://localhost:8080/api`, por lo que el sistema completo debe ejecutarse con puertos coherentes. No basta con cambiar el puerto del backend para integrar el frontend.

Desde otra terminal (ajustar el puerto si se eligió 18080):

```powershell
Invoke-RestMethod http://localhost:8080/api/health
Invoke-RestMethod http://localhost:8080/api/cursos
Invoke-RestMethod http://localhost:8080/api/cursos/1
```

Se espera `status = ok` y, con los datos iniciales, **6 cursos**; el curso con ID 1 es `yoga`.

## 5. Contrato y consulta SOAP

Cuando el backend del PR #17 esté ejecutándose, las direcciones son:

- WSDL: `http://localhost:8080/ws/cursos.wsdl`
- XSD: `http://localhost:8080/ws/cursosSchema.xsd`
- Endpoint SOAP 1.1: `http://localhost:8080/ws/cursos`

Ejemplo de consulta en PowerShell:

```powershell
$xml = @'
<?xml version="1.0" encoding="UTF-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cur="http://una.ac.cr/gimnasio/soap/cursos">
  <soapenv:Header/>
  <soapenv:Body>
    <cur:ConsultarCursoRequest><cur:id>1</cur:id></cur:ConsultarCursoRequest>
  </soapenv:Body>
</soapenv:Envelope>
'@

Invoke-WebRequest 'http://localhost:8080/ws/cursos' -UseBasicParsing `
  -Method POST -ContentType 'text/xml; charset=utf-8' `
  -Headers @{ SOAPAction = 'http://una.ac.cr/gimnasio/soap/cursos/ConsultarCurso' } `
  -Body $xml
```

Para el ID 1, `encontrado` debe ser `true` y la descripción `yoga`; para un ID inexistente, `encontrado` debe ser `false`. Las pruebas del contrato JAXB están en `src/test/java/.../soap/`.

## 6. Autenticación y control de acceso

El backend usa **sesiones HTTP** (`JSESSIONID`). El cuerpo de `/api/usuarios/login` recibe `username` y `passwordHash`; a pesar del nombre de este campo, se envía **la contraseña en texto plano sobre HTTP local** y el servidor la verifica con BCrypt. En un despliegue fuera del equipo local se necesita HTTPS y una política adecuada de credenciales.

```powershell
# Con el backend iniciado en el puerto 8080:
$clave = Read-Host 'Contraseña del usuario admin' -AsSecureString
$cred = New-Object System.Management.Automation.PSCredential('admin', $clave)
$body = @{ username = 'admin'; passwordHash = $cred.GetNetworkCredential().Password } | ConvertTo-Json
Invoke-RestMethod 'http://localhost:8080/api/usuarios/login' `
  -Method POST -ContentType 'application/json' -Body $body -SessionVariable sesion
Invoke-RestMethod 'http://localhost:8080/api/usuarios/sesion' -WebSession $sesion
```

La contraseña se solicita directamente en la consola sin mostrar su contenido, evitando ventanas emergentes de Windows Terminal. Las credenciales del archivo SQL son **exclusivamente de demostración**, no para producción. Se observaron controles 401 (sin sesión) y 403 (sin permiso) en los controladores; la matriz completa de roles queda para las pruebas de integración.

Para los cursos, el contrato REST incluye:

| Acción | Ruta | Resultado previsto |
|---|---|---|
| Listar | `GET /api/cursos` | 200 |
| Consultar | `GET /api/cursos/{id}` | 200 / 404 |
| Crear | `POST /api/cursos` | 201; requiere ADMIN o INSTRUCTOR |
| Actualizar | `PUT /api/cursos/{id}` | 200; requiere ADMIN o INSTRUCTOR |
| Eliminar | `DELETE /api/cursos/{id}` | 204; requiere ADMIN o INSTRUCTOR |
| Crear ID duplicado | `POST /api/cursos` | **409** con sesión autorizada |
| ID inválido / descripción inválida | `POST /api/cursos` | 400, sujeto a validación |

Las operaciones de escritura son reales: usar datos de prueba y no ejecutarlas sobre una base que deba conservarse intacta. Otros recursos REST son `/api/clientes`, `/api/instructores`, `/api/maquinas`, `/api/rutinas` y `/api/usuarios`; sus permisos y contratos deben verificarse con pruebas específicas, no suponerse idénticos a los de cursos.

## 7. Ejecutar el frontend React

En una segunda terminal, desde la raíz del repositorio:

```powershell
cd .\gimnasio-frontend
npm ci
npm run dev
```

Abrir la URL que indique Vite (normalmente `http://localhost:5173`). `npm run build` genera la compilación de producción en `dist/`; `npm run lint` ejecuta el analizador configurado. El frontend React no debe copiarse a `htdocs` para usar el servidor de desarrollo de Vite.

**Pendiente de validación:** integración total del frontend, persistencia de sesión, mantenimiento, inscripción y desinscripción hasta revisar y corregir el PR #18. No se consideran aprobadas por el hecho de que Vite inicie.

## 8. Solución de problemas habituales

| Síntoma | Diagnóstico inicial |
|---|---|
| XAMPP se detiene con error 10048 | Otro servidor ocupa 3306; identificarlo antes de detener servicios |
| `Access denied for user 'root'@'localhost'` | Revisar instancia, usuario y contraseña; `application.properties` usa `root` sin clave |
| `Unknown database 'gimnasio'` | Ejecutar el asistente de preparación en una instalación vacía |
| Fallo al iniciar por puerto 8080 | Identificar ocupante o iniciar backend aislado con `--server.port=18080` |
| SOAP responde `encontrado=false` para curso existente | Verificar namespaces JAXB y que se haya construido el JAR corregido |
| XSD responde 405 | Verificar el bean `cursosSchema` y la URL `cursosSchema.xsd` |
| `BUILD FAILURE` por XML | Comprobar que `cursos.xsd` no tenga espacios antes de la declaración XML |
| Advertencia Hibernate de versión MySQL `5.5.5` | MariaDB 10.4 se identifica como versión compatible antigua; la ejecución básica pasó, pero Hibernate advierte que no garantiza todas las funciones |

## 9. Alcance pendiente antes de la entrega final

La validación completa incluirá frontend integrado con autenticación real, CRUD de cada recurso, permisos por rol, validación y errores HTTP, casos de inscripción/desinscripción, revisión de seguridad, evidencias, manual de usuario y documentación técnica. Estas actividades se ejecutarán en sus fases y PR respectivos; este README distingue explícitamente lo **comprobado** de lo **pendiente**.
