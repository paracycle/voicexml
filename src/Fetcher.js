'use strict';

const Bluebird = require('bluebird');
const fetch = require('node-fetch');
fetch.Promise = Bluebird;

class Fetcher {
	constructor() {}

	fetch(uri) {
		return fetch(uri)
			.then(response => response.text());
	}
}

module.exports = Fetcher;