"use strict";

var EventEmitter = require('events').EventEmitter,
	eventCenters = {};

/**
 * Access an event center
 * @param {String=} name - Name of center to load
 * @return EventEmitter
 */
module.exports = function(name) {
	name = name || "default";

	if (!eventCenters[name]) {
		eventCenters[name] = new EventEmitter();
	}

	return eventCenters[name];
}