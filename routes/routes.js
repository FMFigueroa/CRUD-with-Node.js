const express = require("express");
const router = express.Router();

// Rutas
router.get("/", (req, res) => {
  /* console.log(__dirname); */
  res.render("index", { titulo: "Titulo dinamico del Home Page" });
});

router.get("/servicios", (req, res) => {
  res.render("servicios", { titulo: "Titulo dinamico de Servicios" });
});

module.exports = router;
