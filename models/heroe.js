const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create Schema
const heroeSchema = new Schema({
  name: {
    //nombre del heroe
    type: String,
    required: true,
  },
  description: {
    //descripcion del heroe
    type: String,
    required: true,
  },
});

//create model
const Heroe = mongoose.model("Heroe", heroeSchema);

module.exports = Heroe;
