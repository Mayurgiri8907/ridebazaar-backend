const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const orderController = require('../controller/order');

router.post('/save',auth,orderController.saveAddress);
router.post('/create-order',auth,orderController.createOrder);
router.post('/payment-verify',auth,orderController.paymentVerify);
router.post('/:userId',auth,orderController.getAddress);

module.exports = router;