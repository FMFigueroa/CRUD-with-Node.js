const express = require("express"); // import express
const app = express(); // create express app
const PORT = process.env.PORT || 3000; // Puerto en el que escucha el servidor

//Motor de Plantillas
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// Middleware para poder acceder a los archivos estaticos
app.use(express.static(__dirname + "/public"));

// Rutas
app.get("/", (req, res) => {
  /* console.log(__dirname); */
  res.render("index", { titulo: "titulo dinamico" });
});

app.get("/servicios", (req, res) => {
  res.render("servicios", { titulo: "titulo de Servicios" });
});

app.use((req, res, next) => {
  res.status(404).render("404", {
    titulo: "Error 404",
    description: " Pagina no encontrada en el Servidor",
  });
});

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`Escuchando Solicitudes en el puerto ${PORT}`); // Mensaje de inicio
});
