const express = require("express");
const router = express.Router();

const Heroe = require("../models/heroe");

router.get("/", async (req, res) => {
  try {
    const heroes = await Heroe.find();
    console.log(heroes);
    res.render("dashboard", {
      heroes,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
