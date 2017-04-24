'use strict';

const winston = require('winston');

module.exports = function (prompt) {
	winston.info(`${ prompt.trim() }`)
}