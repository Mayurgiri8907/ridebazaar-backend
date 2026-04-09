const express = require('express');
const router = express.Router();
const vahicalController = require('../controller/vahical');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');




router.post(
  "/add",
  upload.fields([
    { name: "front", maxCount: 1 },
    { name: "back", maxCount: 1 },
    { name: "left", maxCount: 1 },
    { name: "right", maxCount: 1 },
  ]),
  vahicalController.addvahical
);

module.exports = router;
