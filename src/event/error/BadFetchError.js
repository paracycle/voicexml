'use strict';

const EVENT_TYPE = 'error.badfetch';

class BadFetchError {
	constructor(message) {
		this._message = message;
	}
}

module.exports = BadFetchError;