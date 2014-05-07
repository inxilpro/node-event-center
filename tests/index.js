'use strict';

var assert = require('assert'),
	EventEmitter = require('events').EventEmitter,
	eventCenter = require('../index.js');

describe('An EventCenter', function() {
	it('should be an instance of an EventEmitter', function() {
		var center = eventCenter(),
			emitter = new EventEmitter();

		for (var prop in emitter) {
			var propType = typeof emitter[prop];
			assert(center[prop] !== undefined, 'EventCenter object should have property "' + prop + '"');
			assert.equal(typeof center[prop], propType, "EventCenter." + prop + ' should be of type"' + propType + '"');
		}
	});
});

describe('The default EventCenter', function() {
	it('should be the same as an EventCenter named "default"', function() {
		var noName = eventCenter(),
			defaultName = eventCenter('default');
		assert.equal(noName, defaultName);
	});

	it('should NOT be the same as a named EventCenter', function() {
		var defaultCenter = eventCenter(),
			otherCenter = eventCenter('other');
		assert.notEqual(defaultCenter, otherCenter);
	});
});

describe('A named EventCenter', function() {
	it('should be accessible by its name across scopes', function(done) {
		var center = eventCenter('not default');
		center.on('some event', done);

		(function() {
			var otherCenter = eventCenter('not default');
			otherCenter.emit('some event');
		})();
	});
});