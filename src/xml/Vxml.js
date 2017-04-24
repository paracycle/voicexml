'use strict';

const Node = require('./Node');

class Vxml extends Node {
	constructor(node, children) {
		super(node, children);

		this._version = this.attr('version');
		this._base = this.attr('base');
		this._lang = this.attr('lang');
		this._application = this.attr('application');
	}

	get version() {
		return this._version;
	}

	get base() {
		return this._base;
	}

	get lang() {
		return this._lang;
	}

	get application() {
		return this._application;
	}
}

Vxml.TAG_NAME = 'vxml';

module.exports = Vxml;
