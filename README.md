# test learup

# Problema
Estás contribuyendo al desarrollo de un sistema de gestión de empleados para una empresa que
busca realizar un seguimiento preciso de los cambios en la estructura jerárquica a lo largo del
tiempo. En este contexto, cada empleado tiene un superior jerárquico, y cada vez que se produce
un cambio en esta relación, se requiere incrementar la versión del empleado actualizado. Este
proceso de versionamiento actúa de manera incremental, reflejando cuántas veces ha sido
modificado el perfil del empleado.

# Solucion:

Se procedio a crear una DB en mysql se creo una tabla empleados que tiene relacion con la tabla jefes, cada vez que se realiza un update al jefe directo se registro un historial en la tabla historial.
