'use strict';

const uuid = require('uuid');
const Node = require('./Node');

class Form extends Node {
	constructor(node, children) {
		super(node, children);

		this._id = this.attr('id') || `_id_${uuid.v1().replace(/-/g, '_')}`;
		this._scope = this.attr('scope');
	}

	get id() {
		return this._id;
	}

	get scope() {
		return this._scope;
	}
}

Form.TAG_NAME = 'form';

module.exports = Form;