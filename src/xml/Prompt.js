'use strict';

const winston = require('winston');

const Node = require('./Node');
const model = require('../model');
const promptPlayer = require('../promptPlayer');

class Prompt extends Node {
	constructor(node, children) {
		super(node, children);

		this._bargeIn = this.attr('bargeIn');
		this._bargeInType = this.attr('bargeInType');
		this._cond = this.attr('cond');
		this._count = this.attr('count');
		this._timeout = this.attr('timeout');
	}

	get bargeIn() {
		return this._bargeIn;
	}

	get bargeInType() {
		return this._bargeInType;
	}

	get cond() {
		return this._cond;
	}

	get count() {
		return this._count;
	}

	get timeout() {
		return this._timeout;
	}

	execute() {
		var cond = model.evaluate(this.cond, true);

		if (cond) {
			promptPlayer(this.children.reduce((parts, child) => {
				child.execute(text => parts.push(text));
				return parts
			}, []).join(''));
		} else {
			winston.debug("cond %s does not evaluates to a truthy value: skipping prompt", this.cond);
		}
	}
}

Prompt.TAG_NAME = 'prompt';

module.exports = Prompt;