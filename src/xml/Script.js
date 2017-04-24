'use strict';

const winston = require('winston');

const Node = require('./Node');
const model = require('../model');
const Fetcher = require('../Fetcher');

class Script extends Node {
	constructor(node, children) {
		super(node, children);

		this._src = this.attr('src');
	}

	get src() {
		return this._src;
	}

	execute() {
		if (this.src) {
			new Fetcher().fetch(this.src).then(data => this._evaluate(data));
		} else {
			this._evaluate();
		}
	}

	_evaluate(script = this.text) {
		model.evaluate(script);
	}
}

Script.TAG_NAME = 'script';

module.exports = Script;