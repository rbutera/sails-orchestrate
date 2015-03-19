/**
 * Test dependencies
 */

var Adapter;
var mocha = require('mocha');
var assert = require("assert");

if (process.env.NODE_DEBUG === 'true') {
  Adapter = require('../../');
} else {
  Adapter = require('../../lib-cov/adapter');
}

describe('Array', function(){
  describe('#indexOf()', function(){
    it('should return -1 when the value is not present', function(done){
      done();
    });
  });
});
