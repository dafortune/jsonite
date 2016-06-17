'use strict';

const expect = require('chai').expect
const jsonite = require('./exec_jsonite');

describe('Basic', function() {

  describe('for key values', function() {

    it ('returns expected json', function(done) {
      jsonite(['k1=value1', 'k2=value2', 'k3=value with whispace'], (e, o) => {
        if (e) return done(e)

        expect(o).to.eql({ k1: 'value1', k2: 'value2', k3: 'value with whispace' })
        done()
      })
    })
  })

  describe('for path values', function() {

    it ('returns expected json', function(done) {
      jsonite(['k1.k2[1]=value1', 'k1.k2[0]=value2', 'k3=value with whispace'], (e, o) => {
        if (e) return done(e)

        expect(o).to.eql({ k1: { k2: ['value2', 'value1'] }, k3: 'value with whispace' })
        done()
      })
    })
  })
})
