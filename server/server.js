const express = require("express");
const cors = require("cors");
const axios = require("axios")
const cheerio = require("cheerio");

const routes =  require('./routes');
require("dotenv").config();


const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(4000, () => {
  console.log('Server started on port 4000!');
});

module.exports = app;