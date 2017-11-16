"use strict";

var config = require("../config/config.json");
var Sequelize = require("sequelize");

var Database = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

module.exports = Database;
