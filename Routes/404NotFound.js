const express = require("express");
const route  = express.Router();
const NotFound = require("../Controller/404Controller")

route.get("/",NotFound.NotFound);

module.exports = route;