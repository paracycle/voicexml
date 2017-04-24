'use strict';

class GotoNextFormEvent {
	constructor(nextForm) {
		this._nextForm = nextForm;
	}

	get nextForm() {
		return this._nextForm;
	}
}

module.exports = GotoNextFormEvent;