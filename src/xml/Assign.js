'use strict';

const winston = require('winston');

const Node = require('./Node');
const model = require('../model');
const promptPlayer = require('../promptPlayer');

class Assign extends Node {
	constructor(node, children) {
		super(node, children);

		this._name = this.attr('name');
		this._expr = this.attr('expr');
	}

	get name() {
		return this._name;
	}

	get expr() {
		return this._expr;
	}

	execute() {
		model.assign(this.name, model.evaluate(this.expr));
	}
}

Assign.TAG_NAME = 'assign';

module.exports = Assign;