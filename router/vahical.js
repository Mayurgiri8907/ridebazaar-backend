const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const vahicalController = require('../controller/vahical');
const auth = require('../middleware/auth');

router.post("/add", upload.array("images", 4), auth, vahicalController.addvahical);
// router.post('/singup',vahicalController.usersingup)

module.exports = router;