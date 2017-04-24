'use strict';

class GotoNextFormItemEvent {
	constructor(item) {
		this._item = item;
	}

	get item() {
		return this._item;
	}
}

module.exports = GotoNextFormItemEvent;