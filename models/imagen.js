var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var env = require('node-env-file'); // .env file
env(global.appRoot + '/.env');

// Conectamos a la base de datos
mongoose.connect(process.env.DB);


// Creamos el esquema
var img_schema = Schema({
    title:{type:String,required:true},
    extension:{type: String, required: true},
    owner:{type: Schema.Types.ObjectId, ref: "Usuario", required:true},
    megusta_count:{type: Number, default: 0}
});

// Creamos el modelo
var Imagen = mongoose.model("Imagen",img_schema);

module.exports.Imagen = Imagen;