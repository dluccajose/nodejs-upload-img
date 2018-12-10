var express = require("express");
var router =express.Router();
var Megusta = require("../models/megusta").Megusta;
var Imagen = require ("../models/imagen").Imagen;




router.route("/megusta/:id")

    .get(function (req, res) {

        var megusta = new Megusta({
            usuario: res.locals.user._id,
            imagen: req.params.id
        });

        megusta.save(function (err) {

            if (!err) {
                console.log("Me Gusta guardado con exito");

                Imagen.findById(req.params.id, function (err, doc) {    // Buscamos la imagen a actualizar

                    if (!err) {
                        doc.megusta_count++;    // Aumentamos el conteo de Megusta
                        doc.save(function (err) {

                            if (!err) {
                                console.log("conteo actualizado correctamente");
                            }
                        });
                    } else {
                        res.render("app/error", { error: err });
                        console.log(err);
                    }
                });

                res.redirect("/app/imagenes/" + req.params.id);

            } else {
                res.render("app/error", { error: err });
                console.log(err);
            }
        });

    });

    module.exports = router;