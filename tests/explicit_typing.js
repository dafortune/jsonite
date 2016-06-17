'use strict';

const expect = require('chai').expect
const jsonite = require('./exec_jsonite');

describe('Explicit typing', function() {

  describe ('for numbers', function() {
    it ('uses specified types', function(done) {
      jsonite(['k3=2', '-t', 'k3=string'], (e, o) => {
        if (e) return done(e)

        expect(o).to.eql({ k3: '2' })
        done()
      })
    })
  })

  describe ('for null', function() {
    it ('uses specified types', function(done) {
      jsonite(['k2=', '-t', 'k2=string'], (e, o) => {
        if (e) return done(e)

        expect(o).to.eql({ k2: '' })
        done()
      })
    })
  })
})
