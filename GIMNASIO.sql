--Práctica #3 código en Oracle 11g
--a. Crear la base de datos Gimnasio

/*b. Crear las siguientes tablas, todos los campos deben ser Not Null a excepción los campos email y dirección de las tablas Cliente e Intructores.
Nota PK, indica que el campo debe ser creado como llave primaria y FK indica que el o los campos
deben ser creados como llaves foráneas en el momento de la creación de las tablas.*/

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
almacenar lo siguiente *@*.com y si el campo dirección de ambas tablas no tiene datos
se debe almacenar N/A.*/

ALTER TABLE cliente ALTER COLUMN direccion SET DEFAULT 'n/a';
ALTER TABLE instructores ALTER COLUMN direccion SET DEFAULT 'n/a';

ALTER TABLE cliente ALTER COLUMN e_mail SET DEFAULT '*@*.com';
ALTER TABLE instructores ALTER COLUMN e_mail SET DEFAULT '*@*.com';


/*f. Establecer los campos Cedula_Cliente, Cod_Instructor , Cod_Maquina , como llaves
foráneas en la tabla Rutinas.*/
alter table rutinas add constraint fkrutina_cliente foreign key (cliente) references cliente (cedula);
alter table rutinas add constraint fk2rutina_instructor foreign key (instructor) references instructores (cod_instructor);

--g. Insertar la siguiente información en las diferentes tablas.
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


/*a. Mostrar cedula, nombre, apellido_1 , apellido_2, del cliente con mayor antigüedad en el
gimnasio.*/

select c1.cedula,c1.nombre,c1.apellido_1,c1.apellido_2,c1.fecha_inscripcion
from cliente c1
where c1.fecha_inscripcion = (select min(distinct fecha_inscripcion)
from cliente);


/*b. Mostrar cedula, nombre, apellido_1 , apellido_2, FECHA DE INSCRIPCION, de cliente mas
reciente del gimnasio.*/
select c1.cedula,c1.nombre,c1.apellido_1,c1.apellido_2,c1.fecha_inscripcion
from cliente c1
where c1.fecha_inscripcion =(select max(distinct fecha_inscripcion)
from cliente);

/*c. Mostrar cod_instructor , nombre, apellido_1 , apellido_2, del instructor con más
antigüedad del gimnasio.*/
select c1.cod_instructor,c1.nombre,c1.apellido_1,c1.apellido_2,c1.fecha_contratacion
from instructores c1
where c1.fecha_contratacion=(select min(distinct fecha_contratacion)
from instructores);

/*d. Mostrar cod_instructor , nombre, apellido_1 , apellido_2,fecha de contratacion del
instructor mas reciente del gimnasio.*/
select c1.cod_instructor,c1.nombre,c1.apellido_1,c1.apellido_2,c1.fecha_contratacion
from instructores c1
where c1.fecha_contratacion=(select max(distinct fecha_contratacion)
from instructores);

/*e. Mostrar cedula, nombre, apellido_1 , apellido_2, del cliente que ha estado en todos los
cursos que imparte el gimnasio.*/
select c1.cedula,c1.nombre,c1.apellido_1,c1.apellido_2
from cliente c1
where c1.cedula = (select cliente
from historial_curso
group by cliente
having count(distinct(to_char(cliente)||to_char(curso)))=(select count (c.id_curso) from cursos c));


/*f. Mostrar cedula, nombre, apellido_1 , apellido_2, del cliente que ha utilizado todas las
maquinas del gimnasio.*/

select c1.cedula,c1.nombre,c1.apellido_1,c1.apellido_2
from cliente c1
where c1.cedula = (select cliente
from rutinas
group by cliente
having count(distinct(to_char(cliente)||to_char(maquina)))=(select count (m.id_maquina) from maquinas m));

/*g. Crear una tabla que contenga la siguiente información: cedula, nombre, apellido_1 ,
apellido_2, del cliente que tiene cursos matriculados , pero nunca ha realizado una
rutina, la tabla debe llamarse Curso_cliente.*/


/*h. Crear una tabla que contenga la siguiente información: cedula, nombre, apellido_1 ,
apellido_2, del cliente que tiene rutinas , pero nunca han llevado un curso, la tabla debe
llamarse Rutina_cliente.*/


/*i. Mostrar cedula, nombre, apellido_1 , apellido_2, del cliente que nunca después de ser
registrado en el sistema,no asistió a una rutina , ni a un curso.*/

select c1.cedula,c1.nombre,c1.apellido_1,c1.apellido_2
from cliente c1
where c1.cedula not in (select hc.cliente from historial_curso hc)
intersect
select c1.cedula,c1.nombre,c1.apellido_1,c1.apellido_2
from cliente c1
where c1.cedula not in (select r.cliente from rutinas r);


/*j. Mostrar cod_instructor , nombre, apellido_1 , apellido_2, del instructor que nunca a dado
un curso y solo ha impartido rutinas*/

select i.cod_instructor,i.nombre,i.apellido_1,i.apellido_2
from instructores i
where i.cod_instructor in(select r.instructor from rutinas r)
minus
select i.cod_instructor,i.nombre,i.apellido_1,i.apellido_2
from instructores i
where i.cod_instructor in(select hc.instructor from historial_curso hc);


/*k. Mostrar cod_instructor , nombre, apellido_1 , apellido_2, del instructor que nunca a ha
impartido rutinas y solo ha dado un cursos.*/
select i.cod_instructor,i.nombre,i.apellido_1,i.apellido_2
from instructores i
where i.cod_instructor in(select hc.instructor from historial_curso hc)
minus
select i.cod_instructor,i.nombre,i.apellido_1,i.apellido_2
from instructores i
where i.cod_instructor in(select r.instructor from rutinas r);

--l. Por medio de un left o right join mostrar los clientes que no tienen cursos matriculados.

select c1.*
from cliente c1
left join historial_curso hc
on c1.cedula= hc.cliente
where hc.cliente is null;


--m. Por medio de un left o right join mostrar los clientes que no tienen rutinas matriculados.

select c1.*
from rutinas r
right join cliente c1
on c1.cedula = r.cliente
where r.cliente is null;

--n. Mostrar por medio de un left o right join toda la información de las maquinas que nunca
--han sido utlizadas.

select m.*
from maquinas m
left join rutinas r
on m.id_maquina = r.maquina
where r.maquina is null;


--o. Mostrar por medio de un left o right join toda la información de los cursos que nunca han
--sido matriculados.

select c.*
from historial_curso hc
right join cursos c
on c.id_curso = hc.curso
where hc.curso is null;
