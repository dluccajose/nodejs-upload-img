var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var env = require('node-env-file'); // .env file
env(global.appRoot + '/.env');


// Conectamos a la base de datos
mongoose.connect(process.env.DB);

// Creamos el esquema
var megsuta_schema = Schema({
    usuario:{type: Schema.Types.ObjectId, ref: "Usuario", required:true},
    imagen:{type: Schema.Types.ObjectId, ref: "Imagen", required: true},
});

// Creamos el modelo
var Megusta = mongoose.model("Megusta",megsuta_schema);

module.exports.Megusta = Megusta;