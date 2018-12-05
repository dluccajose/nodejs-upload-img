var express = require("express");
var router = express.Router();
var Imagen = require("../models/imagen").Imagen;
var Usuario = require("../models/user").Usuario;


router.route("/")

.get(function (req, res) {

    
    Imagen.find(function (err, doc) {

        var total_imagenes = doc.length    // Numero de imagenes subidas
        var tus_imagenes = 0;

        // Contar imagenes subidas por el usuario
        for (var i = 0; i < doc.length; i++) {
            if (doc[i].owner.toString() === res.locals.user._id.toString()) {
                tus_imagenes++;
            }
        }

        Usuario.find(function (err, user_doc) {

            var total_usuarios = user_doc.length;   // Numero de usuarios registrados

            res.render("app/home", {
                total_imagenes: total_imagenes,
                tus_imagenes: tus_imagenes,
                total_usuarios: total_usuarios
            });

        });

    });

})

module.exports = router;
