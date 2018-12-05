var express = require("express");
var router = express.Router();
var Usuario = require("../models/user").Usuario;


 // Rutas de Usuario
router.route("/usuario")

    .get(function(req,res) {
        res.render("app/usuario");
    })

    .put(function(req, res) {
        Usuario.findById(res.locals.user._id, function(err, user) {
            if(!err) {
                user.nombre = req.body.nombre;
                user.apellido = req.body.apellido;
                user.alias = req.body.alias;
                user.ocupacion = req.body.ocupacion;
                user.save(function(err) {
                    if(!err) {
                        console.log("Usuario modificado con exito");
                        res.redirect("/app/usuario");
                    } else {
                        res.render("app/error", {error: err});
                    }
                });
            } else {
                res.render("app/error", {error: err});
            }
        })
    });

module.exports = router;