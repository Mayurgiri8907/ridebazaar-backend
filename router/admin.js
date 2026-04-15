const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const adminController = require('../controller/admin');

router.post('/',adminController.adminlogin)
router.post('/singup',adminController.adminsingup)
router.get('/users',auth,adminController.showallusers)
router.delete('/delete/:id',auth,adminController.deleteUser)

module.exports = router;