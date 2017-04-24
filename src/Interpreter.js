'use strict';

const winston = require('winston');

const FormInterpretationAlgorithm = require('./FormInterpretationAlgorithm');
const Nodes = require('./xml/');

class Interpreter {
	constructor (session, doc, startDialog) {
		this._session = session;
		this._doc = doc;
		this._nextDialog = startDialog
			? this.getDialog(startDialog)
			: this.dialogs[0];
	}

	process(dialog) {
		this._nextDialog = null;

		// run FIA
		const fia = new FormInterpretationAlgorithm(dialog);

		winston.debug("Processing dialog: %s", JSON.stringify(dialog));

		fia.initialize();
		fia.mainLoop();
	}

	get nextDialog() {
		return this._nextDialog;
	}

	get dialogs() {
		if (!this._dialogs) {
			this._dialogs = this._doc
				.children
				.filter(node => node.oneOf(Nodes.Form, Nodes.Menu));
		}

		return this._dialogs;
	}

	getDialog(id) {
		winston.debug(this.dialogs);
		return this.dialogs.find(dialog => dialog.id === id);
	}
}

module.exports = Interpreter;