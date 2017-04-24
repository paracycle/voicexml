'use strict';

const winston = require('winston');

const Node = require('./Node');
const model = require('../model');
const promptPlayer = require('../promptPlayer');

class Value extends Node {
	constructor(node, children) {
		super(node, children);

		this._expr = this.attr('expr');
	}

	get expr() {
		return this._expr;
	}

	execute(player = promptPlayer) {
		player(model.evaluate(this.expr));
	}
}

Value.TAG_NAME = 'value';

module.exports = Value;