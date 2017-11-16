'use strict';

var db = require('./database');
var Sequelize = require('sequelize');
var User = require('./user');

//-----------------  your code below  -------------------//

var Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  isCheap: {
    type: Sequelize.BOOLEAN,
    get() {
      return (this.price < 3) ? true : false
    }
  },
  isExpensive: {
    type: Sequelize.BOOLEAN
  }
}, {
  getterMethods: {
    initials: function() {
      var initials = ''
      this.name.split(' ').forEach(word => initials += word[0]);

      return initials;
      // return this.name.split(' ')[0][0] + this.name.split(' ')[1][0]
    }
  }
});

Product.findByInitials = function (initialsToFind) {
  return Product.findAll({})
  .then(allProducts => {
    return allProducts.filter(product => product.initials === initialsToFind)
  })
}

Product.prototype.changePrice = function (price) {
  this.price = price;
}

Product.hook('beforeValidate', function(productInstance) {
  (productInstance.price > 5)
  ? productInstance.isExpensive = true
  : productInstance.isExpensive = false
})

Product.belongsTo(User, {as: 'seller'});

//-----------------  your code above  -------------------//

module.exports = Product;
