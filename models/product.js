'use strict';

var db = require('./database');
var Sequelize = require('sequelize');
var User = require('./user');

//-----------------  your code below  -------------------

var Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    // allowNull: false,
    // validate: {
    //   notEmpty: true
    // }
  },
  inventory: {
    type: Sequelize.INTEGER,
    defaultValue: 10
  }
});

//-----------------  your code above  -------------------

module.exports = Product;
