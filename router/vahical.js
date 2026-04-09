const express = require('express');
const router = express.Router();
const vahicalController = require('../controller/vahical');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');




router.post(
  "/add",
  auth,
  upload.fields([
    { name: "front" },
    { name: "back" },
    { name: "left" },
    { name: "right" },
  ]),
  vahicalController.addvahical
);

module.exports = router;
