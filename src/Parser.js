'use strict';

const libxml = require('libxmljs');
const nodeBuilder  = require('./xml/nodeBuilder');

class Parser {
	constructor() {}

	parse(content) {
		this._document = libxml.parseXmlString(content);

		return nodeBuilder(this._document.root()); 
	}
}

module.exports = Parser;