const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userController = require('../controller/user');

router.post('/',userController.userlogin)
router.post('/singup',userController.usersingup)

module.exports = router;