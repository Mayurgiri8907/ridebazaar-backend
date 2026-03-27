const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const vahicalController = require('../controller/vahical');
const auth = require('../middleware/auth');
// const multer = require('multer');

// router.post("/add", upload.array("images", 4), auth, vahicalController.addvahical);
// router.post('/singup',vahicalController.usersingup)


// const upload = multer({ dest: "images/" });

router.post("/add",auth,upload.array("images", 4),vahicalController.addvahical );

module.exports = router;
