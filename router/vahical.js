const express = require('express');
const router = express.Router();
const vahicalController = require('../controller/vahical');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');




router.post(
  "/add",
  auth,
  upload.single("image"),
  vahicalController.addvahical
);

module.exports = router;
