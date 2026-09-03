# gimnasio-web-grupoN2
El presente proyecto consiste en desarrollar un sistema web completo para la gestión de un gimnasio, aplicando los temas oficiales del programa del curso Programación 4 (Internet/web, HTML5 + CSS3, Java del lado del servidor, JavaScript del lado del cliente, SPA, servicios web y autenticación/autorización).


# Sistema Web Gimnasio - Grupo N

Proyecto de Programación 4 (II Semestre 2026) - Universidad Nacional.

## Integrantes
- Maria Ramirez Elizondo - Lider
- Cristopher Madrigal Masis

## Requisitos
- XAMPP (Apache + MySQL)
- JDK 26
- Node.js (LTS)
- IntelliJ IDEA

## Cómo levantar el proyecto

### 1. Clonar el repositorio
git clone https://github.com/marjorm/gimnasio-web-grupoN2.git

### 2. Servidor web (XAMPP)
Abrir XAMPP Control Panel y dar Start en Apache y MySQL.

### 3. Backend (Spring Boot)
- Abrir la carpeta `gimnasio-backend` en IntelliJ IDEA.
- Ejecutar la clase principal  `GimnasioBackendApplication`.
- Probar en el navegador: http://localhost:8080/api/health
- Debe responder `{"status":"ok"}`

### 4. Frontend (React)
- Abre el Símbolo del sistema (búscalo como "cmd" en el menú de inicio de Windows) y ubícate en la carpeta del proyecto.
- Luego instala las dependencias y levanta el servidor de desarrollo:
cd gimnasio-frontend
npm install
npm run dev
- Abrir en el navegador la dirección que muestre la terminal (ej. http://localhost:5173)
