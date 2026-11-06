-- Proyecto P4 2026: ampliación segura del esquema original del gimnasio.
-- Aplicar una sola vez sobre una BASE DE PRUEBA creada con GIMNASIO.sql.
-- No utiliza DROP ni elimina registros existentes.
CREATE TABLE IF NOT EXISTS inscripciones (
 id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
 cliente_id INT NOT NULL,
 tipo VARCHAR(10) NOT NULL,
 item_id INT NOT NULL,
 estado VARCHAR(12) NOT NULL DEFAULT 'ACTIVA',
 fecha_registro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
 fecha_cancelacion DATETIME NULL,
 CONSTRAINT fk_ins_cliente FOREIGN KEY (cliente_id) REFERENCES cliente(cedula),
 INDEX ix_ins_cliente_estado (cliente_id,estado)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS pagos (
 id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
 cliente_id INT NOT NULL,
 concepto VARCHAR(100) NOT NULL,
 monto DECIMAL(12,2) NOT NULL,
 fecha_vencimiento DATE NOT NULL,
 fecha_pago DATE NULL,
 estado VARCHAR(12) NOT NULL DEFAULT 'PENDIENTE',
 CONSTRAINT fk_pagos_cliente FOREIGN KEY (cliente_id) REFERENCES cliente(cedula),
 INDEX ix_pagos_mora (cliente_id,estado,fecha_vencimiento)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS consultas_contacto (
 id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
 nombre VARCHAR(60) NOT NULL,
 correo VARCHAR(120) NOT NULL,
 asunto VARCHAR(100) NOT NULL,
 contenido VARCHAR(2000) NOT NULL,
 fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
 estado VARCHAR(20) NOT NULL DEFAULT 'NUEVA'
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS bajas_gimnasio (
 id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
 cliente_id INT NOT NULL,
 fecha_baja DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
 motivo VARCHAR(200) NOT NULL DEFAULT 'Solicitada por el cliente',
 CONSTRAINT fk_baja_cliente FOREIGN KEY (cliente_id) REFERENCES cliente(cedula),
 UNIQUE KEY uk_baja_cliente (cliente_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS curso_detalle (
 curso_id INT NOT NULL PRIMARY KEY,
 horario VARCHAR(80) NOT NULL,
 cupos INT NOT NULL DEFAULT 0,
 imagen VARCHAR(255) NULL,
 CONSTRAINT fk_cursodet_curso FOREIGN KEY (curso_id) REFERENCES cursos(id_curso)
) ENGINE=InnoDB;

-- Datos complementarios de presentación. Horarios y cupos son editables por personal autorizado.
INSERT INTO curso_detalle (curso_id,horario,cupos,imagen)
SELECT id_curso,'Pendiente de programación',0,'/img/instalacion1.jpg' FROM cursos
ON DUPLICATE KEY UPDATE curso_id=curso_id;
