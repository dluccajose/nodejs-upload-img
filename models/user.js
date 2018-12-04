var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Conectamos a la base de datos
mongoose.connect("mongodb://localhost:27017/fotos");


// Creamos el esquema
var user_schema = Schema({
    email:{type:String,required:true},
    password:{type:String,minlength:[8, "Su contrase;a es muy corta"]},
    nombre:{type:String},
    apellido:{type: String},
    alias:{type: String},
    ocupacion:{type: String},
    fecha_registro:{type:Date,required:true}
});

// Creamos el modelo
var Usuario = mongoose.model("Usuario",user_schema);

module.exports.Usuario = Usuario;