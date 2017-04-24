'use strict';

const vm = require('vm');
const Scope = require('./Scope');

class Model {
	constructor() {
		this._scopeStack = [];
		this._currentScope = null;
		this._rootContext = vm.createContext({});
	}

	_createScopeVariable(scope) {
		if (scope.name === Scope.ANONYMOUS) {
			return;
		}

		Object.defineProperty(this._rootContext, scope.name, {
			configurable: true,
			get: function () { return scope.context }
		});
	}

	_deleteScopeVariable(scope) {
		Object.defineProperty(this._rootContext, scope.name, {
			value: undefined
		});
	}

	pushScope(scopeName) {
		var currentContext = this._currentScope
			? this._currentScope.context
			: this._rootContext;

		var scope = new Scope(scopeName, currentContext);
		this._createScopeVariable(scope);

		this._currentScope = scope;
		this._scopeStack.unshift(scope);
	}

	popScope() {
		var poppedScope = this._scopeStack.shift();
		this._deleteScopeVariable(poppedScope);
		this._currentScope = this._scopeStack.slice(0, 1).shift();
	}		

	create(name, value) {
		return this.run(`(value) => ${name} = value;`)(value);
	}

	assign(name, value) {
		return this.create(name, value);
	}

	clear(name) {
		return this.assign(name, undefined);
	}

	evaluate(expr, defaultValue = undefined) {
		return expr ? this.run(expr) : defaultValue;
	}

	run(code) {
		return vm.runInContext(code, this._currentScope.context);
	}
}

module.exports = new Model();