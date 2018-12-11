var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var env = require('node-env-file'); // .env file
env(global.appRoot + '/.env');

// Conectamos a la base de datos
mongoose.connect(process.env.DB);


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