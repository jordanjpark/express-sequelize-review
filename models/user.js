'use strict';

var db = require('./database');
var Sequelize = require('sequelize');

var User = db.define('User', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = User;
