'use strict';

const Node = require('./Node');
const promptPlayer = require('../promptPlayer');

class Text extends Node {
	constructor(node, children) {
		super(node, children);
	}

	execute(player = promptPlayer) {
		if (this.text.trim()) {
			player(this.text);
		}
	}
}

Text.TAG_NAME = 'text';

module.exports = Text;