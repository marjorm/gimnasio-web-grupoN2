--Pr�ctica #3 c�digo en Oracle 11g
--a. Crear la base de datos Gimnasio

/*b. Crear las siguientes tablas, todos los campos deben ser Not Null a excepci�n los campos email y direcci�n de las tablas Cliente e Intructores.
Nota PK, indica que el campo debe ser creado como llave primaria y FK indica que el o los campos
deben ser creados como llaves for�neas en el momento de la creaci�n de las tablas.*/

-- Todos los usuarios tienen contrasena 1234 , admin tiene contrasena admin

create table cliente(
   cedula int not null,
   nombre varchar(30) not null,
   apellido_1 varchar(30) not null,
   apellido_2 varchar(30) not null,
   direccion varchar(50),
   e_mail varchar(30),
   fecha_inscripcion date not null,
   constraint pkcliente primary key (cedula)
);

create table instructores(
    cod_instructor int not null,
    nombre varchar(30) not null,
    apellido_1 varchar(30) not null,
    apellido_2 varchar(30) not null,
    direccion varchar(50),
    e_mail varchar(30),
    tel_cel int not null,
    tel_habitacion int not null,
    fecha_contratacion date not null,
    constraint pkinstructores primary key (cod_instructor)
);

create table usuario (
    id_usuario int not null,           -- Aqui guarda la cedula del cliente o el cod_instructor
    rol varchar(20) not null,           -- 'CLIENTE' o 'INSTRUCTOR'
    username varchar(50) not null unique,
    password_hash varchar(255) not null,
    constraint pk_usuario primary key (id_usuario)
);

create table cursos(
    id_curso int not null,
    descripcion varchar(50) not null,
    constraint pkcursos primary key (id_curso)
);

create table maquinas(
    id_maquina int not null,
    descripcion varchar(50) not null,
    constraint pkmaquinas primary key (id_maquina)
);

create table rutinas(
    id_rutina int not null,
    cliente int not null,
    instructor int not null,
    maquina int not null,
    fecha date not null,
    horas int not null,
    constraint pkrutinas primary key (id_rutina)
);

create table historial_curso(
    id_historial int not null,
    cliente int not null,
    instructor int not null,
    curso int not null,
    fecha date not null,
    horas int not null,
    constraint pkhistorial_curso primary key (id_historial),
    constraint fk1historial_curso foreign key (cliente) references cliente (cedula),
    constraint fk2historial_curso foreign key (instructor) references instructores (cod_instructor),
    constraint fk3historial_curso foreign key (curso) references cursos (id_curso)
);




/*c. Agregar a la tabla cliente los campos: Celular int y Tel_habitacion int , ambos deben ser
Not Null.*/
alter table cliente add celular int not null;

alter table cliente add tel_habitacion int not null;

--d. Agregar a la tabla Maquinas la columna Estado , varchar (15).
alter table maquinas add estado varchar(15);

/*e. Validar en las tablas Cliente e Instructores que si el campo e-mail no tiene datos se debe
almacenar lo siguiente *@*.com y si el campo direcci�n de ambas tablas no tiene datos
se debe almacenar N/A.*/

ALTER TABLE cliente ALTER COLUMN direccion SET DEFAULT 'n/a';
ALTER TABLE instructores ALTER COLUMN direccion SET DEFAULT 'n/a';

ALTER TABLE cliente ALTER COLUMN e_mail SET DEFAULT '*@*.com';
ALTER TABLE instructores ALTER COLUMN e_mail SET DEFAULT '*@*.com';


/*f. Establecer los campos Cedula_Cliente, Cod_Instructor , Cod_Maquina , como llaves
for�neas en la tabla Rutinas.*/
alter table rutinas add constraint fkrutina_cliente foreign key (cliente) references cliente (cedula);
alter table rutinas add constraint fk2rutina_instructor foreign key (instructor) references instructores (cod_instructor);

--g. Insertar la siguiente informaci�n en las diferentes tablas.
 --Tabla cliente
insert into cliente (cedula, nombre, apellido_1, apellido_2, direccion, fecha_inscripcion, celular, tel_habitacion)
values (200, 'maria', 'ruiz', 'ruiz', 'barva', '1995-01-01', 11111111, 22222222);

insert into cliente (cedula, nombre, apellido_1, apellido_2, direccion, e_mail, fecha_inscripcion, celular, tel_habitacion)
values (201, 'juan', 'paz', 'arias', 'alajuela', 'juan@hotmail.com', '1995-01-01', 22222222, 11111111);

insert into cliente (cedula, nombre, apellido_1, apellido_2, fecha_inscripcion, celular, tel_habitacion)
values (202, 'pedro', 'perez', 'perez', '1998-04-20', 33333333, 33333335);

insert into cliente (cedula, nombre, apellido_1, apellido_2, direccion, e_mail, fecha_inscripcion, celular, tel_habitacion)
values (203, 'jose', 'castro', 'ruiz', 'santo domingo', 'jruiz@gmail.com', '1998-06-20', 44444444, 55555555);

insert into cliente (cedula, nombre, apellido_1, apellido_2, direccion, e_mail, fecha_inscripcion, celular, tel_habitacion)
values (204, 'martha', 'diaz', 'ruiz', 'pavas', 'mdiaz@yahoo.es', '2000-01-02', 22222229, 33333333);

insert into cliente (cedula, nombre, apellido_1, apellido_2, e_mail, fecha_inscripcion, celular, tel_habitacion)
values (205, 'xiomara', 'diaz', 'diaz', 'xdiaz@hotmail.com', '2000-02-03', 55555555, 11111119);

insert into cliente (cedula, nombre, apellido_1, apellido_2, direccion, fecha_inscripcion, celular, tel_habitacion)
values (206, 'pablo', 'arias', 'arias', 'san jose', '2001-04-20', 55555556, 11111112);

insert into cliente (cedula, nombre, apellido_1, apellido_2, direccion, e_mail, fecha_inscripcion, celular, tel_habitacion)
values (207, 'ana', 'arias', 'arias', 'san pedro', 'arias@gmail.com', '2001-04-25', 55555556, 11111115);

insert into cliente (cedula, nombre, apellido_1, apellido_2, direccion, fecha_inscripcion, celular, tel_habitacion)
values (208, 'carmen', 'paz', 'arias', 'san jose', '2002-04-20', 55555556, 11111115);

insert into cliente (cedula, nombre, apellido_1, apellido_2, fecha_inscripcion, celular, tel_habitacion)
values (209, 'miguel', 'orias', 'arias', '2002-08-20', 55555557, 11111114);

insert into cliente (cedula, nombre, apellido_1, apellido_2, direccion, fecha_inscripcion, celular, tel_habitacion)
values (210, 'julia', 'arias', 'cruz', 'san rafael', '2003-04-20', 55555559, 11111119);

insert into cliente (cedula, nombre, apellido_1, apellido_2, fecha_inscripcion, celular, tel_habitacion)
values (211, 'paula', 'castillo', 'reyes', '2003-05-15', 66666666, 77777777);

insert into cliente (cedula, nombre, apellido_1, apellido_2, direccion, e_mail, fecha_inscripcion, celular, tel_habitacion)
values (212, 'david', 'arias', 'arias', 'san jose', 'darias@gmail.com', '2005-10-20', 88888888, 99999999);

insert into cliente (cedula, nombre, apellido_1, apellido_2, direccion, e_mail, fecha_inscripcion, celular, tel_habitacion)
values (213, 'andres', 'aguilar', 'rios', 'guadalupe', 'aaguilar@yahoo.com', '2007-12-10', 99999999, 88888888);

insert into cliente (cedula, nombre, apellido_1, apellido_2, direccion, e_mail, fecha_inscripcion, celular, tel_habitacion)
values (214, 'maria jose', 'villalta', 'paz', 'heredia', 'mjvillalta@gmail.com', '2011-04-20', 77777777, 66666666);

insert into cliente (cedula, nombre, apellido_1, apellido_2, direccion, fecha_inscripcion, celular, tel_habitacion)
values (215, 'pablo jose', 'castillo', 'arias', 'san jose', '2011-04-20', 33333333, 66666666);

-- Usuarios

-- Todos los usuarios tienen contrasena 1234 Admin tiene contrasena admin
insert into usuario (id_usuario, rol, username, password_hash) values (200, 'CLIENTE', 'mruiz', '$2a$08$rU/6hddilka035vyVu3PGes/X8djMEtADnH0V.ZGtD7//PA7ifN/G');
insert into usuario (id_usuario, rol, username, password_hash) values (201, 'CLIENTE', 'jpaz', '$2a$08$rU/6hddilka035vyVu3PGes/X8djMEtADnH0V.ZGtD7//PA7ifN/G');
insert into usuario (id_usuario, rol, username, password_hash) values (202, 'CLIENTE', 'pperez', '$2a$08$rU/6hddilka035vyVu3PGes/X8djMEtADnH0V.ZGtD7//PA7ifN/G');
insert into usuario (id_usuario, rol, username, password_hash) values (203, 'CLIENTE', 'jcastro', '$2a$08$rU/6hddilka035vyVu3PGes/X8djMEtADnH0V.ZGtD7//PA7ifN/G');
insert into usuario (id_usuario, rol, username, password_hash) values (204, 'CLIENTE', 'mdiaz', '$2a$08$rU/6hddilka035vyVu3PGes/X8djMEtADnH0V.ZGtD7//PA7ifN/G');
insert into usuario (id_usuario, rol, username, password_hash) values (205, 'CLIENTE', 'xdiaz', '$2a$08$rU/6hddilka035vyVu3PGes/X8djMEtADnH0V.ZGtD7//PA7ifN/G');
insert into usuario (id_usuario, rol, username, password_hash) values (206, 'CLIENTE', 'parias', '$2a$08$rU/6hddilka035vyVu3PGes/X8djMEtADnH0V.ZGtD7//PA7ifN/G');
insert into usuario (id_usuario, rol, username, password_hash) values (207, 'CLIENTE', 'aarias', '$2a$08$rU/6hddilka035vyVu3PGes/X8djMEtADnH0V.ZGtD7//PA7ifN/G');
insert into usuario (id_usuario, rol, username, password_hash) values (208, 'CLIENTE', 'cpaz', '$2a$08$rU/6hddilka035vyVu3PGes/X8djMEtADnH0V.ZGtD7//PA7ifN/G');
insert into usuario (id_usuario, rol, username, password_hash) values (209, 'CLIENTE', 'morias', '$2a$08$rU/6hddilka035vyVu3PGes/X8djMEtADnH0V.ZGtD7//PA7ifN/G');
insert into usuario (id_usuario, rol, username, password_hash) values (210, 'CLIENTE', 'jarias', '$2a$08$rU/6hddilka035vyVu3PGes/X8djMEtADnH0V.ZGtD7//PA7ifN/G');
insert into usuario (id_usuario, rol, username, password_hash) values (211, 'CLIENTE', 'pcastillo', '$2a$08$rU/6hddilka035vyVu3PGes/X8djMEtADnH0V.ZGtD7//PA7ifN/G');
insert into usuario (id_usuario, rol, username, password_hash) values (212, 'CLIENTE', 'darias', '$2a$08$rU/6hddilka035vyVu3PGes/X8djMEtADnH0V.ZGtD7//PA7ifN/G');
insert into usuario (id_usuario, rol, username, password_hash) values (213, 'CLIENTE', 'aaguilar', '$2a$08$rU/6hddilka035vyVu3PGes/X8djMEtADnH0V.ZGtD7//PA7ifN/G');
insert into usuario (id_usuario, rol, username, password_hash) values (214, 'CLIENTE', 'mvillalta', '$2a$08$rU/6hddilka035vyVu3PGes/X8djMEtADnH0V.ZGtD7//PA7ifN/G');
insert into usuario (id_usuario, rol, username, password_hash) values (215, 'CLIENTE', 'pjcastillo', '$2a$08$rU/6hddilka035vyVu3PGes/X8djMEtADnH0V.ZGtD7//PA7ifN/G');


--tabla instructores
insert into instructores (cod_instructor, nombre, apellido_1, apellido_2, direccion, tel_cel, tel_habitacion, fecha_contratacion)
values (100, 'matio', 'jhoson', 'ruiz', 'san jose', 11111111, 22222222, '1995-01-01');

insert into instructores (cod_instructor, nombre, apellido_1, apellido_2, direccion, e_mail, tel_cel, tel_habitacion, fecha_contratacion)
values (101, 'juliana', 'blackz', 'arias', 'alajuela', 'jul@hotmail.com', 22222222, 11111111, '1995-01-01');

insert into instructores (cod_instructor, nombre, apellido_1, apellido_2, tel_cel, tel_habitacion, fecha_contratacion)
values (102, 'maria', 'perez', 'perez', 33333333, 33333335, '1998-04-20');

insert into instructores (cod_instructor, nombre, apellido_1, apellido_2, direccion, e_mail, tel_cel, tel_habitacion, fecha_contratacion)
values (103, 'cristian', 'castro', 'ruiz', 'alajuela', 'cruiz@gmail.com', 44444444, 55555555, '1998-06-20');

insert into instructores (cod_instructor, nombre, apellido_1, apellido_2, direccion, e_mail, tel_cel, tel_habitacion, fecha_contratacion)
values (104, 'margarita', 'mata', 'ruiz', 'pavas', 'mmata@yahoo.es', 11111112, 22222228, '2000-01-20');

insert into instructores (cod_instructor, nombre, apellido_1, apellido_2, e_mail, tel_cel, tel_habitacion, fecha_contratacion)
values (105, 'shirley', 'ruiz', 'diaz', 'sruiz@hotmail.com', 22222229, 33333333, '2000-02-03');

insert into instructores (cod_instructor, nombre, apellido_1, apellido_2, tel_cel, tel_habitacion, fecha_contratacion)
values (106, 'cameron', 'rojas', 'rojas', 88888889, 77777777, '2010-07-20');

insert into instructores (cod_instructor, nombre, apellido_1, apellido_2, e_mail, tel_cel, tel_habitacion, fecha_contratacion)
values (107, 'patrick', 'ruiz', 'diaz', 'pactrick@hotmail.com', 10101010, 98989898, '2011-12-15');

insert into instructores (cod_instructor, nombre, apellido_1, apellido_2, tel_cel, tel_habitacion, fecha_contratacion)
values (110, 'sharlotte', 'castillo', 'paz', 99999999, 22222233, '2010-05-03');

-- Usuarios intructores
insert into usuario (id_usuario, rol, username, password_hash) values (100, 'INSTRUCTOR', 'mjhoson', '$2a$08$rU/6hddilka035vyVu3PGes/X8djMEtADnH0V.ZGtD7//PA7ifN/G');
insert into usuario (id_usuario, rol, username, password_hash) values (101, 'INSTRUCTOR', 'jblackz', '$2a$08$rU/6hddilka035vyVu3PGes/X8djMEtADnH0V.ZGtD7//PA7ifN/G');
insert into usuario (id_usuario, rol, username, password_hash) values (102, 'INSTRUCTOR', 'mperez', '$2a$08$rU/6hddilka035vyVu3PGes/X8djMEtADnH0V.ZGtD7//PA7ifN/G');
insert into usuario (id_usuario, rol, username, password_hash) values (103, 'INSTRUCTOR', 'ccastro', '$2a$08$rU/6hddilka035vyVu3PGes/X8djMEtADnH0V.ZGtD7//PA7ifN/G');
insert into usuario (id_usuario, rol, username, password_hash) values (104, 'INSTRUCTOR', 'mmata', '$2a$08$rU/6hddilka035vyVu3PGes/X8djMEtADnH0V.ZGtD7//PA7ifN/G');
insert into usuario (id_usuario, rol, username, password_hash) values (105, 'INSTRUCTOR', 'sruiz', '$2a$08$rU/6hddilka035vyVu3PGes/X8djMEtADnH0V.ZGtD7//PA7ifN/G');
insert into usuario (id_usuario, rol, username, password_hash) values (106, 'INSTRUCTOR', 'crojas', '$2a$08$rU/6hddilka035vyVu3PGes/X8djMEtADnH0V.ZGtD7//PA7ifN/G');
insert into usuario (id_usuario, rol, username, password_hash) values (107, 'INSTRUCTOR', 'pruiz', '$2a$08$rU/6hddilka035vyVu3PGes/X8djMEtADnH0V.ZGtD7//PA7ifN/G');
insert into usuario (id_usuario, rol, username, password_hash) values (110, 'INSTRUCTOR', 'scastillo', '$2a$08$rU/6hddilka035vyVu3PGes/X8djMEtADnH0V.ZGtD7//PA7ifN/G');

insert into usuario (id_usuario, rol, username, password_hash) values (1, 'ADMIN', 'admin', '$2a$08$q2mib5cs7AXt4kH1Q3t7H.EI64lx3ROlHLfYGz40ijaFe2EAHJyAK');

--tabla cursos
insert into cursos values (1,'yoga');
insert into cursos values (2,'defensa personal');
insert into cursos values (3,'kinboxing');
insert into cursos values (4,'spinnig');
insert into cursos values (5,'taebo');
insert into cursos values (6,'zumba');

select * from cursos;

--tabla maquinas

insert into maquinas values (50,'pesas','bueno');
insert into maquinas values (51,'mancuernas','excelente');
insert into maquinas values (52,'caminadora','regular');
insert into maquinas values (53,'bicicleta estacionaria','excelente');
insert into maquinas values (54,'bicicleta spinning','bueno');
insert into maquinas values (55,'press de banca','regular');
insert into maquinas values (56,'press de pecho','bueno');

--tabla historial_curso
INSERT INTO historial_curso VALUES (1, 200, 110, 6, '2000-02-20', 2);
INSERT INTO historial_curso VALUES (2, 200, 101, 1, '2000-02-20', 2);
INSERT INTO historial_curso VALUES (3, 205, 105, 2, '2000-02-20', 3);
INSERT INTO historial_curso VALUES (4, 206, 102, 3, '2000-05-03', 2);
INSERT INTO historial_curso VALUES (5, 201, 101, 4, '2000-07-20', 4);
INSERT INTO historial_curso VALUES (6, 208, 110, 3, '2000-08-18', 3);
INSERT INTO historial_curso VALUES (7, 208, 110, 1, '2000-08-18', 2);
INSERT INTO historial_curso VALUES (8, 201, 110, 6, '2000-08-18', 1);
INSERT INTO historial_curso VALUES (9, 210, 102, 1, '2007-04-15', 1);
INSERT INTO historial_curso VALUES (10, 210, 101, 4, '2007-04-15', 2);
INSERT INTO historial_curso VALUES (11, 210, 105, 3, '2007-04-15', 1);
INSERT INTO historial_curso VALUES (12, 212, 105, 1, '2008-05-10', 2);
INSERT INTO historial_curso VALUES (13, 213, 105, 2, '2008-05-10', 2);
INSERT INTO historial_curso VALUES (14, 210, 105, 3, '2008-05-10', 2);
INSERT INTO historial_curso VALUES (15, 201, 105, 4, '2008-05-10', 2);
INSERT INTO historial_curso VALUES (16, 202, 105, 5, '2008-05-10', 2);

--tabla rutinas
INSERT INTO rutinas VALUES (1, 209, 110, 50, '2000-02-20', 2);
INSERT INTO rutinas VALUES (3, 209, 101, 50, '2000-02-20', 2);
INSERT INTO rutinas VALUES (5, 205, 105, 55, '2000-02-20', 3);
INSERT INTO rutinas VALUES (7, 215, 102, 53, '2000-05-03', 2);
INSERT INTO rutinas VALUES (9, 215, 101, 55, '2000-07-20', 4);
INSERT INTO rutinas VALUES (11, 208, 110, 56, '2000-08-18', 3);
INSERT INTO rutinas VALUES (13, 208, 110, 52, '2000-08-18', 2);
INSERT INTO rutinas VALUES (15, 201, 110, 53, '2000-08-18', 1);
INSERT INTO rutinas VALUES (17, 210, 102, 55, '2007-04-15', 1);
INSERT INTO rutinas VALUES (19, 210, 101, 50, '2007-04-15', 2);
INSERT INTO rutinas VALUES (21, 210, 107, 50, '2007-04-15', 1);
INSERT INTO rutinas VALUES (23, 212, 107, 51, '2008-05-10', 2);
INSERT INTO rutinas VALUES (25, 213, 107, 52, '2008-05-10', 2);
INSERT INTO rutinas VALUES (27, 210, 107, 53, '2008-05-10', 2);
INSERT INTO rutinas VALUES (29, 201, 107, 54, '2008-05-10', 2);
INSERT INTO rutinas VALUES (31, 202, 105, 55, '2008-05-10', 2);



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
