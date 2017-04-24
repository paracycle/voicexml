'use strict';

const winston = require('winston');

const model = require('./model');
const promptPlayer = require('./promptPlayer');
const Nodes = require('./xml/');

const FORM_ITEMS = ['block', 'initial', 'field', 'object', 'record', 'subdialog', 'transfer'];

class FormInterpretationAlgorithm {
	constructor(dialog) {
		this._dialog = dialog;
		this._formItemMap = {};
		this._formItems = dialog.children.filter(node => FORM_ITEMS.indexOf(node.tagName) !== -1);
	}

	initialize() {
		this._reprompt = false;
		this._activeDialogChanged = true;

		this._formItems.forEach(formItem => this._initializeFormItem(formItem));

		this._dialog.children
			.filter(child => child.oneOf(Nodes.Var, Nodes.Script))
			.forEach(child => child.execute());
	}

	mainLoop() {
		winston.debug(`-- FIA: MainLoop`);
		var lastFormItemName = null;
		var gotoFormItemName = null;

		do {
			// winston.silly("Before main loop: %s", JSON.stringify(model));
			this._item = this._select(gotoFormItemName);
			winston.debug(`-- FIA: MainLoop - Selected: ${ JSON.stringify(this._item) }`);
			gotoFormItemName = null;

			if (this._item != null) {
				this._activeDialogChanged = this._item.name != lastFormItemName;
				lastFormItemName = this._item.name;

				this._collect(this._item);

				this._process(this._item);
			}
			// winston.silly("After main loop: %s", JSON.stringify(model));
		} while (this._item != null);
	}

	_initializeFormItem(formItem) {
		formItem.init();
		this._formItemMap[formItem.name] = formItem;
	}

	_select(name) {
		winston.debug('-- FIA: Select');

		if (name) {
			return this._formItemMap[name];
		}

		return Object.keys(this._formItems)
			.map(name => this._formItems[name])
			.find(item => item.selectable);
	}

	_collect(formItem) {
		winston.debug('-- FIA: Collect');
		if (!formItem) {
			return;
		}

		if (this._reprompt || !this._activeDialogChanged) {
			this._queuePrompts(formItem);
		}

		this._reprompt = false;
		this._activeDialogChanged = false;

		// @todo: activate grammars
		formItem.execute();
	}

	_process(formItem) {
		winston.debug('-- FIA: Process');
	}

	_queuePrompts(formItem) {
		formItem.children
			.filter(child => child.oneOf(Nodes.Prompt, Nodes.Audio, Nodes.Text, Nodes.Value))
			.map(child => child.execute());
	}
}

module.exports = FormInterpretationAlgorithm;