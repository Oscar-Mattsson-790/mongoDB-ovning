const Orders = require("./order.schema");
const { getProductById } = require("./product.model");

async function calculateTotalPrice(products) {
  let total = 0;

  for (const product of products) {
    const item = await getProductById(product.id);
    total += item.price * product.quantity;
  }

  return total;
}

async function createOrder(products, order) {
  const { orderNr, eta } = order;

  const total = await calculateTotalPrice(products);

  const result = await Orders.create({ orderNr, eta, total, products });
  return result;
}

module.exports = { createOrder };
