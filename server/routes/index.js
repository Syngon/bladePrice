const express = require("express");
const router = express.Router();

router.use("/produtos", require("./produtos"));

module.exports = router;
