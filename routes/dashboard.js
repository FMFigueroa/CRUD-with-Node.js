const express = require("express");
const router = express.Router();

const Heroe = require("../models/heroe");

//Method GET
router.get("/", async (req, res) => {
  try {
    const heroes = await Heroe.find();
    //console.log(heroes);
    res.render("dashboard", {
      heroes,
    });
  } catch (error) {
    console.log(error);
  }
});

//New Route
router.get("/crear", (req, res) => {
  res.render("crear");
});

//Method POST
router.post("/", async (req, res) => {
  const { name, description } = req.body;
  const heroe = new Heroe({
    name,
    description,
  });
  try {
    await heroe.save();
    res.redirect("/dashboard");
    console.log(`El superheroe ${name} fue creado exitosamente..!`);
  } catch (error) {
    console.log(error);
  }
});

//View Detail
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const heroeDetail = await Heroe.findOne({ _id: id });
    console.log(`Vista de Detalle del SuperHeroe ${heroeDetail.name}`);

    res.render("detail", {
      heroe: heroeDetail,
      error: false,
    });
  } catch (error) {
    console.log(error);
    res.render("detail", {
      error: true,
      message: " No se encontro un resultado, intenta nuevamente",
    });
  }
});

//Method DELETE
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const heroe = await Heroe.findByIdAndDelete({ _id: id });
    //console.log(heroe);
    if (!heroe) {
      res.json({
        estado: false,
        message: "No se pudo eliminar",
      });
      console.log(`No se pudo eliminar al SuperHeroe ${heroe.name}`);
    } else {
      res.json({
        estado: true,
        message: "eliminado exitosamente!",
      });
      console.log(`Eliminado exitosamente el SuperHeroe ${heroe.name}`);
    }
  } catch (error) {
    console.log(error);
  }
});

//Method PUT
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { name, description } = req.body;
  try {
    const heroe = await Heroe.findByIdAndUpdate(
      { _id: id },
      { name, description }
    );
    //console.log(heroe);
    if (!heroe) {
      res.json({
        estado: false,
        message: "No se pudo actualizar",
      });
      console.log(`No se pudo actualizar al SuperHeroe ${heroe.name}`);
    } else {
      res.json({
        estado: true,
        message: "actualizado exitosamente!",
      });
      console.log(`Actualizado exitosamente el SuperHeroe ${heroe.name}`);
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
