var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Conectamos a la base de datos
mongoose.connect("mongodb://localhost:27017/fotos");

// Creamos el esquema
var megsuta_schema = Schema({
    usuario:{type: Schema.Types.ObjectId, ref: "Usuario", required:true},
    imagen:{type: Schema.Types.ObjectId, ref: "Imagen", required: true},
});

// Creamos el modelo
var Megusta = mongoose.model("Megusta",megsuta_schema);

module.exports.Megusta = Megusta;