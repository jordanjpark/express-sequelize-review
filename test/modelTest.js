'use strict';

var Promise = require('bluebird');
var expect = require('chai').expect;
var { User, Product, db } = require('../models/');

describe('Product Model', () => {

  // before each run, clear and recreate tables
  before(() => {
    return db.sync({ force: true });
  });

  // test #1
  xit('a product has name, description and price', () => {

    return Product.create({
      name: 'Coors Light',
      description: 'light beer',
      price: 1
    })
    .then(createdProduct => {
      expect(createdProduct.name).to.equal('Coors Light');
      expect(createdProduct.description).to.equal('light beer');
      expect(createdProduct.price).to.equal(1);
    });

  });

  // test #2
  xit('a product has `strict` requirement for description to be `not null` and `not empty` (hint: validate)', () => {


    var budLight = Product.build({
      name: 'Bud Light',
      description: '',
      price: 2
    });

    return budLight.validate()
    .then(
      success => {
        expect(success).to.be.undefined; // eslint-disable-line no-unused-expressions
      },
      error => {
        expect(error).to.be.an.instanceOf(Error);
        expect(error.message).to.contain('Validation error');
      }
    );

  });

  // test #3
  xit('a product has `isCheap` property and a `getter` to check if it is cheap (cheap = less than $3) ', () => {

    return Product.findOne({ where: {name: 'Coors Light'} })
    .then(foundProduct => {
      expect(foundProduct.description).to.equal('light beer');
      expect(foundProduct.price).to.equal(1);
      expect(foundProduct.isCheap).to.equal(true);
    });

  });

  describe('Getter', function() {

  // test #4
    xit("contains an `initials` getter that gives a product's initials", function() {

      return Product.create({
        name: 'Coors Light',
        description: 'light beer',
        price: 1
      })
      .then(createdProduct => {
        expect(createdProduct.initials).to.equal('CL');
      });

    });
  });

  describe('Class Method', function() {

    beforeEach(() => {
      var productData = [
        {
          name: 'Bud Light',
          description: 'light beer',
          price: 2
        },
        {
          name: 'Miller Light',
          description: 'light beer',
          price: 3
        },
        {
          name: 'Booze Light',
          description: 'light booze',
          price: 7
        }
      ];

      return Promise.map(productData, product => {
        return Product.create(product);
      })
    });

  // test #5
    xit('a product has a `class method` to find with initials', () => {

      return Product.findByInitials('BL')
      .then(foundProduct => {
        expect(foundProduct).to.have.length(2)
      })

    });

  });

  describe('Instance Method', function() {

  // test #6
    xit('a product has an `instance method` to change price', function() {

      return Product.findOne({ where: { name: 'Miller Light' }})
      .then(foundProduct => {
        expect(foundProduct.price).to.equal(3);
        foundProduct.changePrice(30);
        expect(foundProduct.price).to.equal(30);
      })

    });
  });

  describe('Hook', function() {

  // test #7
    xit('a product has a `hook` to validate `isExpensive` property (expensive = more than $5)', function() {

      return Product.findOne({ where: { name: 'Booze Light' }})
      .then(foundProduct => {
        expect(foundProduct.isExpensive).to.equal(true);
      })

    });

  // test #8
    xit('the hook is reset when a product is updated', function() {

        return Product.findOne({ where: { name: 'Booze Light' }})
        .then(expensiveBooze => {
          expect(expensiveBooze.isExpensive).to.equal(true);
          return expensiveBooze.update({
            price: 1
          })
        .then(cheapBooze => {
          expect(cheapBooze.isExpensive).to.equal(false);
          });
        })

    });
  });

  describe('Association', function() {

  // test #9
  xit('a product belongs to a user, who is stored as the product\'s `seller`', function() {

        var seller;

        return User.create({ name: 'Jordan'})
        .then(function(createdUser) {
          seller = createdUser;
          return Product.create({
            name: 'Solution for Checkpoint',
            description: 'illegal',
            price: 1000000
          });
        })
        .then(function(product) {
          return product.setSeller(seller);
        })
        .then(function() {
          return Product.findOne({
            where: { name: 'Solution for Checkpoint' },
            include: { model: User, as: 'seller' }
          });
        })
        .then(function(product){
          expect(product.seller).to.exist; // eslint-disable-line no-unused-expressions
          expect(product.seller.name).to.equal('Jordan');
        });
    });
  });
});
