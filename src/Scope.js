'use strict';

const vm = require('vm');

class Scope {
	constructor(name, parentContext) {
		this._name = name;
		this._context = vm.createContext({});
		this._context.__proto__ = parentContext;
		// Object.defineProperty(this._context, name, {
		// 	enumerable: true,
		// 	get: function () { return this._context }
		// })


		// Object.defineProperty(context, previousScope, {
		// 	get: function () { return previousContext; }
		// });
	}

	get name() {
		return this._name;
	}

	get context() {
		return this._context;
	}
} 

Scope.SESSION = 'session';
Scope.APPLICATION = 'application';
Scope.DOCUMENT = 'document';
Scope.DIALOG = 'dialog';
Scope.ANONYMOUS = 'anonymous';

module.exports = Scope;