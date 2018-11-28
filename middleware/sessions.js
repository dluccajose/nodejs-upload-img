var Usuario = require("../models/user").Usuario;

module.exports = function(req, res, next) {
    if(!req.session.user) {
        res.redirect("/login");
    } else {
        Usuario.findById(req.session.user, function(err, user) {
            if(err) {
                console.log("Error al buscar usuario");
                console.log(err);
            } else {
                res.locals.user = user;
                next();
            }
        });

    }
};

