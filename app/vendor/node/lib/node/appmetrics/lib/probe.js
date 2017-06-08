/*******************************************************************************
 * Copyright 2015 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *******************************************************************************/

var aspect = require('./aspect.js');
var request = require('./request.js');
var timer = require('./timer.js');

function Probe(name) {
	this.name = name;
	this.config = {};
	this.metricsProbeStart = this.metricsStart;
	this.metricsProbeEnd = this.metricsEnd;
}

/*
 * Function to add instrumentation to the target module
 */
Probe.prototype.attach = function(name, target) {
	return target;
};

/*
 * Set configuration by merging passed in config with current one
 */
Probe.prototype.setConfig = function (newConfig) {
	for (var prop in newConfig) {
		if (typeof(newConfig[prop]) !== 'undefined') {
			this.config[prop] = newConfig[prop];
		}
	}
	if (this.config.filters) {
		this.config.filters.forEach(function(filter) {
			if (typeof(filter.regex) === 'undefined') {
				filter.regex = new RegExp(filter.pattern);
			}
		});
	}	
};

/*
 * Lightweight metrics probes
 */
Probe.prototype.metricsStart = function(probeData) {
	probeData.timer = timer.start();
};

// Implentors should stop the timer and emit an event.
Probe.prototype.metricsEnd = function(probeData) {
	probeData.timer.stop();
};

/*
 * Heavyweight request probes
 */

Probe.prototype.requestStart = function (req, res, am) {};

Probe.prototype.requestEnd = function (req, res, am) {};

/*
 * Default to metrics on
 */
Probe.prototype.metricsProbeStart =  function(req, res, am) {};
Probe.prototype.metricsProbeEnd =  function(req, res, am) {};

/*
 * Default to requests off
 */
Probe.prototype.requestProbeStart = function (req, res, am) {
};
Probe.prototype.requestProbeEnd = function (req, res, am) {};

Probe.prototype.enableRequests = function() {
	this.requestProbeStart = this.requestStart;
	this.requestProbeEnd = this.requestEnd;
}

Probe.prototype.disableRequests = function() {
	this.requestProbeStart = function () {};
	this.requestProbeEnd = function () {};
}

Probe.prototype.enable = function() {
	this.metricsProbeStart = this.metricsStart;
	this.metricsProbeEnd = this.metricsEnd;
};

Probe.prototype.disable = function() {
	this.metricsProbeStart = function() {};
	this.metricsProbeEnd = function() {};
};

module.exports = Probe;