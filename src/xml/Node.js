'use strict';

class Node {
	constructor(node, children) {
		this._tagName = node.name();
		this._attrs = node.attrs().reduce((acc, attr) => { 
			acc[attr.name()] = attr.value(); 
			return acc;
		}, {});
		this._children = children;
		this._node = node;
	}

	get tagName() {
		return this._tagName;
	}

	get children() {
		return this._children;
	}

	get text() {
		return this._node.text();
	}

	attr(name) {
		return this._attrs[name];
	}

	is(type) {
		return type && type.TAG_NAME && type.TAG_NAME === this._tagName;
	}

	oneOf(...types) {
		return types.some(type => this.is(type));
	}
}


module.exports = Node;