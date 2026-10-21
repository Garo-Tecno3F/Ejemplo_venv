delimiter //

CREATE TRIGGER new_producto
after insert on producto
FOR EACH ROW
begin
	insert into producto_log(id_producto,nombre,precio,stock,imagen,fecha_hora,usuario,operacion)
    values(new.id,new.nombre,new.precio,new.stock,new.imagen,now(),user(),'Alta');
end//

CREATE TRIGGER update_producto
after update on producto
FOR EACH ROW
begin
	insert into producto_log(id_producto,nombre,precio,stock,imagen,fecha_hora,usuario,operacion)
    values(new.id,new.nombre,new.precio,new.stock,new.imagen,now(),user(),'Modificación');
end//

CREATE TRIGGER delete_producto
after delete on producto
FOR EACH ROW
begin
	insert into producto_log(id_producto,nombre,precio,stock,imagen,fecha_hora,usuario,operacion)
    values(old.id,old.nombre,old.precio,old.stock,old.imagen,now(),user(),'Baja');
end//