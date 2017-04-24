'use strict';

const uuid = require('uuid');
const winston = require('winston');
const model = require('./model');
const Parser = require('./Parser');
const Fetcher = require('./Fetcher');
const Interpreter = require('./Interpreter');
const Scope = require('./Scope');
const Events = require('./event/');

class Session {
	constructor() {
		this._uuid = uuid.v1();
		this._parser = new Parser();
		this._fetcher = new Fetcher();
	}

	call(uri) {
		// this._application = new Application();
		this._run(uri);
	}

	_run(uri) {
		model.pushScope(Scope.SESSION);
		model.create('connection', {
			local: {
				uri: 'local test'
			},
			remote: {
				uri: 'remote test'
			},
			protocol: {
				name: 'protocol name',
				version: 'protocol version'
			},
			redirect: [],
			aai: null,
			originator: this.remote // @todo
		});

		this._loadDocument(uri)
			.then(doc => this._process(doc))
			.finally(() => model.popScope());
	}

	_process(doc) {
		model.pushScope(Scope.APPLICATION);
		model.create('lastresult$', []);
		model.create('lastresult$.confidence', null);
		model.create('lastresult$.utterance', null);
		model.create('lastresult$.inputmode', null);
		model.create('lastresult$.interpretation', null);

        var dialog = null; // @todo initialize this from uri fragment

        while (doc) {
        	try {
	        	model.pushScope(Scope.DOCUMENT);
	        	var doc = this._interpret(doc, dialog);
        	} finally {
        		model.popScope();
        	}

        }

        model.popScope();
	}

	_interpret(doc, startDialog) {
		winston.debug('Interpreting %s', doc);

		const interpreter = new Interpreter(this, doc, startDialog);

		var dialog = interpreter.nextDialog;

        while (dialog != null) {
            try {
                model.pushScope(Scope.DIALOG);
                interpreter.process(dialog);
                dialog = interpreter.nextDialog;
            } catch (e) {
            	if (e instanceof Events.GotoNextFormEvent) {
	            	var id = e.nextForm;

            		winston.debug('Processing next form event, id = %s', id);

	                dialog = interpreter.getDialog(id);

	                if (!dialog) {
	                    throw new Events.Errors.BadFetchError(`Target of goto '${id}'not found in current document`);
	                }
            // } catch (GotoNextDocumentEvent e) {
            //     final URI uri = e.getUri();
            //     return new DocumentDescriptor(uri);
            // } catch (SubmitEvent e) {
            //     return e.getDocumentDescriptor();
	            } else {
		            throw e;
	            }
            } finally {
                model.popScope();
            }
        }
	}

	_loadDocument(uri) {
		return this._fetcher.fetch(uri)
			.then(content => this._parser.parse(content))
	}
}

module.exports = Session;