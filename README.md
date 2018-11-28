# nodejs-upload-img
Proyecto basico con NodeJS y Express para la carga de imagenes con una base de datos MongoDB. Contiene sistema de usuarios y crud de imagenes

Tema Boostrap utlizado para el diseño: https://www.creative-tim.com/product/paper-kit

# Configuracion
Carpeta de imagenes: Antes de iniciar el proyecto, se debe crear una carpeta con el nombre "uploads" dentro de la carpeta "public" donde seran guardadas las imagenes que se suban al servidor

Configurar la base de datos: Abrir los archvios imagen.js y user.js que se encuentran en la carpeta "models" y sustituir la siguiente linea
con la ruta de la base de datos mongodb que usaran
```
mongoose.connect("mongodb://localhost:27017/fotos");
```

# Capturas de pantalla

Inicio: https://dluccajose.github.io/nodejs-upload-img/screenshots/inicio.png

Lista de Imagenes: https://dluccajose.github.io/nodejs-upload-img/screenshots/lista.png

Subir Imagen: https://dluccajose.github.io/nodejs-upload-img/screenshots/subirimagen.png

Ver Imagen: https://dluccajose.github.io/nodejs-upload-img/screenshots/verimagen.png

Editar Imagen: https://dluccajose.github.io/nodejs-upload-img/screenshots/editarimagen.png
