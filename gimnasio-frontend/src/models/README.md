# Modelos de Datos - Gimnasio SPA

Estructuras de los objetos que maneja el backend (Spring Boot):

## 1. Cliente
- `cedula` (Integer, Primary Key)
- `nombre` (String)
- `apellido1` (String)
- `apellido2` (String)
- `direccion` (String)
- `email` (String)
- `fechaInscripcion` (LocalDate)
- `celular` (Integer)
- `telHabitacion` (Integer)

## 2. Curso
- `id` (Integer)
- `descripcion` (String)

## 3. Instructor
- `id` (Integer)
- `nombre` (String)
- `apellido1` (String)
- `apellido2` (String)
- `direccion` (String)
- `email` (String)
- `fechaContratacion` (LocalDate)
- `celular` (Integer)
- `telHabitacion` (Integer)

## 4. Maquina
- `id` (Integer)
- `descripcion` (String)

## 5. Rutina (Entidad al Consultar - GET)
Cuando se listan o consultan rutinas, el backend devuelve objetos anidados debido a las 
relaciones `@ManyToOne`:

- `id` (Integer)
- `cliente` (Objeto Cliente completo con sus datos)
- `instructor` (Objeto Instructor completo con sus datos)
- `maquina` (Integer - ID de la máquina)
- `fecha` (LocalDate - formato YYYY-MM-DD)
- `horas` (Integer)

## 6. RutinaRequest (DTO para Crear y Actualizar - POST / PUT)
Para registrar o modificar una rutina, se debe enviar un DTO plano con las siguientes llaves numéricas y campos:
- `id` (Integer, obligatorio y positivo)
- `clienteId` (Integer - Cédula del cliente, obligatorio y positivo)
- `instructorId` (Integer - ID del instructor, obligatorio y positivo)
- `maquina` (Integer - ID de la máquina, obligatorio y positivo)
- `fecha` (LocalDate - formato YYYY-MM-DD, obligatorio)
- `horas` (Integer - cantidad de horas, obligatorio y positivo)