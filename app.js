// Modulos necesarios
var express = require("express");
var app = express();
var hbs = require("express-handlebars");
var bodyParser = require("body-parser");
var Usuario = require("./models/user").Usuario;
var session = require("cookie-session");
var router_app = require("./router_app");
var session_middleware = require("./middleware/sessions");
var method_override = require("method-override");
var formidable  = require("express-formidable");



// Configuracion del motor de vistas
app.engine("hbs",hbs({
    extname: 'hbs',
    partialsDir: __dirname + '/views/partials'}));
app.set("view engine", "hbs");


// Configuracion Method Override para APIS
app.use(method_override("_method"));


// Configuracion para usar el body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Middleware Sesions
app.use(session({
    name: 'sessions',
    keys: ["llave-1","llave-2"]
}));

// Configurar Express Formidable
app.use(formidable.parse({keepExtensions: true}));


// Configurar carpeta para archivos estaticos
app.use("/",express.static('public'));

// Middlware para sesiones y rutas de la app
app.use("/app",session_middleware);
app.use("/app",router_app);


// Iniciar Servidor
app.listen(8080);



// Rutas

// Inicio
app.get("/", function(req, res) {
    res.redirect('/login');
})


// Registrar
app.get("/registrar",function(req,res) {
    res.render("registrar");
});


// Login
app.get("/login",function(req,res) {
    if(!req.session.user) {
        res.render("login");
    } else {
        res.redirect("/app");
    }
});

// Registrar usuario
app.post("/registrar",function(req,res) {

    var fechaRegistro = new Date();

    var user = new Usuario({email: req.body.email, 
                            password: req.body.password, 
                            nombre: req.body.nombre,
                            apellido: req.body.apellido,
                            fecha_registro:fechaRegistro});

    Usuario.findOne({email: req.body.email}, function(err, doc) {
        // Si no existe el email, registramos el usuario
        if (!doc) {
            // Guardamos el usaurio haciendo uso de las Promises
            user.save().then(function (us) {
                res.send("Usuario guardado exitosamente");
            }, function (err) {
                if (err) {
                    console.log(String(err));
                    res.end();
                }
            });
        } else {
            res.send("El email ya existe en la base de datos");
        }
    });


});

// Sesiones
app.post("/sessions", function(req,res) {

    Usuario.findOne({email: req.body.email, password: req.body.password}, function(err,user) {
        if(!user) {
            res.send("Usuario no encontrado");
        } else {
            req.session.user = user._id;
            req.session.email = user.email;
            req.session.password = user.password;
            res.redirect("/app");
        }
        res.end();
    })
});

// Cerrar Sesion
app.get("/logout", function(req, res) {
    req.session = null
    console.log("Sesion terminada");
    res.redirect("/login");
});

// Configurar Error 404
app.use(function(req, res) {
    res.status(404).render('app/error', {error: "Error 404: No se ha podido encontrar la pagina"});
 });



