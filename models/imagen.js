var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Conectamos a la base de datos
mongoose.connect("mongodb://localhost:27017/fotos");


// Creamos el esquema
var img_schema = Schema({
    title:{type:String,required:true},
    extension:{type: String, required: true},
    owner:{type: Schema.Types.ObjectId, ref: "Usuario", required:true}
});

// Creamos el modelo
var Imagen = mongoose.model("Imagen",img_schema);

module.exports.Imagen = Imagen;