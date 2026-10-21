from flask import Flask ,jsonify ,request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:@localhost/crud_py_inter'

app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False

db = SQLAlchemy(app)
ma = Marshmallow(app)

#BBDD
class Producto(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    nombre = db.Column(db.String(100))
    precio = db.Column(db.Float())
    stock = db.Column(db.Integer)
    imagen = db.Column(db.String(400))

    def __init__(self,nombre,precio,stock,imagen):
        self.nombre = nombre
        self.precio = precio
        self.stock = stock
        self.imagen = imagen

class Producto_log(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    id_producto = db.Column(db.Integer)
    nombre = db.Column(db.String(100))
    precio = db.Column(db.Float())
    stock = db.Column(db.Integer)
    imagen = db.Column(db.String(400))
    fecha_hora = db.Column(db.DateTime)
    usuario = db.Column(db.String(100))
    operacion = db.Column(db.String(100))

    def __init__(self, id_producto, nombre, precio, stock,imagen,fecha_hora, usuario, operacion):
        self.id_producto = id_producto
        self.nombre = nombre
        self.precio = precio
        self.stock = stock
        self.imagen = imagen
        self.fecha_hora = fecha_hora
        self.usuario = usuario
        self.operacion = operacion

with app.app_context():
    db.create_all() #Se crea la tabla

class ProductoSchema(ma.Schema):
    class Meta:
        fields=('id','nombre','precio','stock','imagen')

class Producto_logSchema(ma.Schema):
    class Meta:
        fields=('id','id_producto','nombre','precio','stock','imagen','fecha_hora','usuario','operacion')

producto_schema=ProductoSchema()            # El objeto producto_schema es para traer un producto
productos_schema=ProductoSchema(many=True)  # El objeto productos_schema es para traer multiples registros de producto

productos_log_schema=Producto_logSchema(many=True)

@app.route('/log', methods=['GET'])
def get_log():
    productos = Producto_log.query.all()
    resultado = productos_log_schema.dump(productos)
    return jsonify(resultado)

@app.route('/productos', methods=['GET'])
def get_productos():
    productos = Producto.query.all()
    resultado = productos_schema.dump(productos)
    return jsonify(resultado)

@app.route('/productos/<id>',methods=['GET'])
def get_producto(id):
    producto=Producto.query.get(id)
    return producto_schema.jsonify(producto)   # retorna el JSON de un producto recibido como parametro


@app.route('/productos/<id>',methods=['DELETE'])
def delete_producto(id):
    producto=Producto.query.get(id)
    db.session.delete(producto)
    db.session.commit()
    return producto_schema.jsonify(producto)

@app.route('/productos', methods=['POST'])
def create_producto():
    nombre = request.json['nombre']
    precio = request.json['precio']
    stock = request.json['stock']
    imagen = request.json['imagen']
    nuevo_producto = Producto(nombre, precio, stock, imagen)
    db.session.add(nuevo_producto)
    db.session.commit()
    return producto_schema.jsonify(nuevo_producto)

@app.route('/productos/<id>',methods=['PUT'])
def update_producto(id):
    producto = Producto.query.get(id)

    nombre = request.json['nombre']
    precio = request.json['precio']
    stock = request.json['stock']
    imagen = request.json['imagen']

    producto.nombre = nombre
    producto.precio = precio
    producto.stock = stock
    producto.imagen = imagen

    db.session.commit()
    return producto_schema.jsonify(producto)

if __name__ == '__main__':
    app.run(debug=True, port=5000)