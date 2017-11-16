'use strict';

var expect = require('chai').expect;
var { User, Product, db } = require('../models/');

describe('Product Model', () => {
    before(() => {
      return db.sync({force: true});
    });

    // test #1
    it('#1 a product has name and description', () => {

      return Product.create({
        name: 'Coors Light',
        description: 'light beer'
      })
      .then(function(savedProduct) {
        expect(savedProduct.name).to.equal('Coors Light');
        expect(savedProduct.description).to.equal('light beer');
      });

    });

    // test #2
    it('#2 a product has strict requirement for description', () => {

      var coorsLight = Product.build({
        name: 'Coors Light',
      });

      return coorsLight.validate()
      .catch(result => {
        expect(err).to.be.an.instanceOf(Error);
        expect(err.message).to.contain('content cannot be null');
      })
    });


});
