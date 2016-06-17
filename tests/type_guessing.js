'use strict';

const expect = require('chai').expect
const jsonite = require('./exec_jsonite');

describe('Type guessing', function() {

  it ('returns correct guessed types', function(done) {
    jsonite(['k1=value1', 'k2=', 'k3=2'], (e, o) => {
      if (e) return done(e)

      expect(o).to.eql({ k1: 'value1', k2: null, k3: 2 })
      done()
    })
  })
})
