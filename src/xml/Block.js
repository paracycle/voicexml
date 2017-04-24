'use strict';

const uuid = require('uuid');
const Node = require('./Node');
const model = require('../model');
const Scope = require('../Scope');

class Block extends Node {
	constructor(node, children) {
		super(node, children);

		this._name = this.attr('name') || `_name_${uuid.v1().replace(/-/g, '_')}`;
		this._expr = this.attr('expr');
		this._cond = this.attr('cond');
	}

	// @todo move to FormItem mixin
	get name() {
		return this._name;
	}

	// @todo move to FormItem mixin
	get expr() {
		return this._expr;
	}

	// @todo move to FormItem mixin
	get cond() {
		return this._cond;
	}

	// @todo move to FormItem mixin
	init() {
		model.create(this.name, model.evaluate(this.expr));
	}

	// @todo move to FormItem mixin
	setVisited() {
		model.assign(this.name, true);
	}

	// @todo move to FormItem mixin
	get selectable() {
		var variable = model.evaluate(this.name);
		var condition = model.evaluate(this.cond, true);

		return !variable && condition;
	}

	execute() {
		try {
			this.setVisited();

			model.pushScope(Scope.ANONYMOUS);
			this.children.forEach(child =>  child.execute());
		} finally {
			model.popScope(Scope.ANONYMOUS);
		}
	}
}

Block.TAG_NAME = 'block';

module.exports = Block;