'use strict';

var sinon = require('sinon');

var Metalsmith = require('metalsmith');
var summary = require('../src/');

describe('metalsmith-summary', function () {
	var sandbox;

	beforeEach(function () {
		sandbox = sinon.sandbox.create();
		sandbox.stub(console, 'log');
	});

	afterEach(function() {
		sandbox.restore();
	});

  it('should print to console when done', function (done) {
    Metalsmith('test/fixtures/basic')
      .use(summary.init())
      .use(summary.print())
      .build(function (err) {
      	if (err) return done(err);
				sinon.assert.calledOnce(console.log);
				sinon.assert.calledWith(console.log, sinon.match(/\d+ files processed in \d\.\d\d seconds\./));
				sandbox.restore();
				done();
			});
  });

	it('should use supplied function to print', function (done) {
		var testlog = sinon.stub();

		Metalsmith('test/fixtures/basic')
      .use(summary.init())
      .use(summary.print(testlog))
      .build(function (err) {
      	if (err) return done(err);
				sinon.assert.calledOnce(testlog);
				sinon.assert.calledWith(testlog, sinon.match(/\d+ files processed in \d\.\d\d seconds\./));
				sandbox.restore();
				done();
			});
	});
});
