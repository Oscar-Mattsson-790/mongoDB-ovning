const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: {
    require: true,
    type: String,
  },
  title: {
    required: true,
    type: String,
  },
  desc: {
    required: true,
    type: String,
  },
  price: {
    required: true,
    type: Number,
  },
});

module.exports = mongoose.model("Products", productSchema);
