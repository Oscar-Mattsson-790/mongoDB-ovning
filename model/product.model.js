const Products = require("./product.schema.js");

async function getProductById(id) {
  const product = await Products.findOne({ id });
  return product;
}

async function getProducts() {
  const allProducts = await Products.find();
  return allProducts;
}

module.exports = { getProducts, getProductById };
