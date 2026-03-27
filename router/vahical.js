const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const vahicalController = require('../controller/vahical');

router.post('/add', auth, upload.array("images", 4),vahicalController.addvahical)
// router.post('/singup',vahicalController.usersingup)

module.exports = router;