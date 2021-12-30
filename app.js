const express = require("express"); // import express
const app = express(); // create express app

require("dotenv").config(); // import dotenv
const PORT = process.env.PORT || 3000; // Puerto en el que escucha el servidor

//conexion a la base de datos
const mongoose = require("mongoose");

const uri = `mongodb+srv://${process.env.USER}:${process.env.KEY}@cluster1.e1jyf.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conexión a la base de datos establecida");
  })
  .catch((err) => {
    console.log(err);
  });

//Motor de Plantillas
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// Middleware para poder acceder a los archivos estaticos
app.use(express.static(__dirname + "/public"));

// Rutas
app.use("/", require("./routes/routes"));
app.use("/dashboard", require("./routes/dashboard"));

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
