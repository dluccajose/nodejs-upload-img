var express = require("express");
var router = express.Router();
var Imagen = require("./models/imagen").Imagen;
var fs = require("fs");

router.get("/", function(req,res){
    res.render("app/home");
});


router.get("/usuario", function(req,res) {
    res.render("app/usuario");
})


router.get("/imagenes/new", function(req,res) {
    res.render("app/imagenes/upload");
});

router.get("/imagenes/edit/:id",function(req,res) {
    Imagen.findById(req.params.id)
          .populate("owner")
          .exec(function(err, img) {
                if(!err) {
                        if(img.owner._id.toString() == res.locals.user._id.toString()) {
                            res.render("app/imagenes/edit", img);    
                        } else {
                            res.render("app/error", {error: "No tienes permisos para editar esta imagen"});
                        }
                    } else {
                        res.render("app/error", {error: err});
                        console.log(err);
                    }
    })

});



// REST API

router.route("/imagenes/:id")

    // Mostrar Imagen
    .get(function(req, res) {

        Imagen.findById(req.params.id)
              .populate("owner")
              .exec(function(err, img) {
                    if(!err) {
                        res.render("app/imagenes/show_image",img);
                    } else {
                        res.render("app/error", {error: err});
                        console.log(err);
                    }
        });

    // Actualizar Imagen
    }).put(function(req, res) {
        Imagen.findById(req.params.id, function(err, img) {
            if(!err) {
                img.title = req.body.titulo;
                img.save(function(err) {
                    if(!err) {
                        res.redirect("/app/imagenes/" + req.params.id);
                    } else {
                        res.render("app/error", {error: err});
                        console.log(err);
                    }
                })

            } else {
                res.render("app/error", {error: err});
                console.log(err);
            }
        });

    //Eliminar Imagen
    }).delete(function(req,res) {
        Imagen.findOneAndRemove({_id: req.params.id}, function(err) {
            if(!err) {
                console.log("Imagen eliminada correctamente");
                res.redirect("/app/imagenes");
            } else {
                res.render("app/error", {error: err});
                console.log(err);
            }
        })
    });



router.route("/imagenes")

    // Mostrat todas las imagenes
    .get(function(req, res) {
        Imagen.find({owner: res.locals.user._id}, function(err,imagenes) {
            if(!err) {
                console.log(imagenes);
                res.render("app/imagenes/all_images", {imagen: imagenes});
            } else {
                res.render("app/error", {error: err});
                console.log(err);
            };
        });
        
    // Subir nueva imagen
    }).post(function(req, res) {
        var extension = req.body.archivo.name.split(".").pop();
        var img = new Imagen({title: req.body.titulo, 
                              extension: extension,
                              owner: res.locals.user._id});
        img.save(function(err) {
            if(!err) {
                console.log(req.body.archivo);
                console.log("Imagen guardada con exito");
                fs.rename(req.body.archivo.path, "public/uploads/" + img._id + "." + extension);
                res.redirect("/app/imagenes/" + img._id);
            } else {
                res.render("app/error", {error: err});
                console.log(err);
            }
        })
    });

module.exports = router;
