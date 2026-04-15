const express = require('express');
const router = express.Router();
const vahicalController = require('../controller/vahical');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');




router.post(
  "/add",
  auth,
  upload.fields([
    { name: "front", maxCount: 1 },
    { name: "back", maxCount: 1 },
    { name: "left", maxCount: 1 },
    { name: "right", maxCount: 1 },
  ]),
  vahicalController.addvahical
);

router.get("/show",auth,vahicalController.showvahical);
router.get('/showvahical',vahicalController.showvahical)
router.get('/caronly',vahicalController.caronly)
router.get('/bikeonly',vahicalController.bikeonly)
router.delete('/:id',auth,vahicalController.deletevahical)
router.get('/:id',vahicalController.singlevahical)
module.exports = router;
