const express = require('express');
const router = express.Router();
const vahicalController = require('../controller/vahical');
const auth = require('../middleware/auth');




router.post("/add",auth,vahicalController.addvahical );

module.exports = router;
