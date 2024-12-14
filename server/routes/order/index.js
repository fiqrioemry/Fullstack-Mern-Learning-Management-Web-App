const express = require("express");
const orderController = require("../../controllers/order");

const router = express.Router();

router.post("/create", orderController.createOrder);
router.post("/capture", orderController.capturePaymentAndFinalizeOrder);

module.exports = router;
