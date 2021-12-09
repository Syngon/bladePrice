const express = require("express");
const produtosRouter = express.Router();


produtosRouter.use('/kabum', require("./produtos/kabum"));
produtosRouter.use('/pichau', require("./produtos/pichau"));
//produtosRouter.use('/terabyte', require("./produtos/terabyte"));
// TODO terabyte route to get props

module.exports = produtosRouter;