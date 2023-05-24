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

async function getOrder() {
  // SELECT Orders.OrderID, Product.title, Orders.OrderDate
  // FROM Orders
  // JOIN Products ON Orders.id = Products.id;

  const result = await Orders.aggregate([
    { $match: { orderNr: "AB1684774822969X" } }, // Letar upp en specifik order baserat på orderNr
    { $project: { orderNr: 1, total: 1, products: 1 } }, // Vilka fält i orders collection vill vi plocka med
    {
      $lookup: {
        from: "products", // Den andra collection vi vill hämta ifrån
        localField: "products.id", // Fält i orders att matcha mot products collection
        foreignField: "id", // Fällt i products att matcha mot i orders collection
        as: "productInfo", // Vad egenskapen där resultat hamnar ska kallas (valfritt namn)
        pipeline: [
          {
            $project: {
              _id: 0,
              title: 1, // Inkludera (inkludera = 1, exkludera = 0) enbart title från products collection
            },
          },
        ],
      },
    },
  ]);

  return result;
}

module.exports = { createOrder, getOrder };
