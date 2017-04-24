'use strict';

class GotoNextDocumentEvent {
	constructor(uri) {
		this._uri = uri;
	}

	get uri() {
		return this._uri;
	}
}

module.exports = GotoNextDocumentEvent;