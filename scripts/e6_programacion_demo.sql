-- EXCLUSIVO para gimnasio_entregable6_test. Valores simulados para defensa.
-- NO describen horarios reales ni oferta oficial del gimnasio.
UPDATE curso_detalle SET
 horario = CASE curso_id
   WHEN 1 THEN 'DEMO: Lun y Mie 18:00'
   WHEN 2 THEN 'DEMO: Mar y Jue 19:00'
   WHEN 3 THEN 'DEMO: Sab 09:00'
   WHEN 4 THEN 'DEMO: Lun y Vie 07:00'
   WHEN 5 THEN 'DEMO: Mie 17:00'
   WHEN 6 THEN 'DEMO: Mar y Jue 17:30'
   ELSE horario END,
 cupos = 12
WHERE horario LIKE 'Pendiente%' AND cupos=0 AND curso_id BETWEEN 1 AND 6;
