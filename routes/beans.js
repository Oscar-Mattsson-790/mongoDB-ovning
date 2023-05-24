const { Router } = require("express");
const router = new Router();

const { generateOrderNr, generateETA } = require("../utils/utils");
const { createOrder, getOrder } = require("../model/order.model");
const { getProducts } = require("../model/product.model");

router.get("/", async (req, res) => {
  try {
    const order = await getOrder();
    const products = await getProducts();
    res.json({ success: true, product: order });
  } catch (error) {
    res.json({ success: false, message: error });
  }
});

router.post("/order", async (req, res) => {
  const { products } = req.body;

  const order = {
    eta: generateETA(),
    orderNr: generateOrderNr(),
  };

  try {
    const orderCreated = await createOrder(products, order);

    res.json(orderCreated);
  } catch (error) {
    res.json({ success: false, message: error });
  }
});

module.exports = router;
