const mongoose = require("mongoose");
const moment = require("moment");

const orderSchema = new mongoose.Schema({
  orderNr: {
    required: true,
    type: String,
  },
  eta: {
    required: true,
    type: Number,
  },
  total: {
    required: true,
    type: Number,
  },
  orderDate: {
    required: true,
    type: String,
    default: () => {
      return moment().format("YY/MM/DD");
    },
  },
  products: {
    required: true,
    type: [{ id: String, quantity: Number }],
  },
});

module.exports = mongoose.model("Orders", orderSchema);
