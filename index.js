'use strict';

const winston = require('winston');
winston.cli();
winston.level = process.env['LEVEL'] || 'info';

const session = new (require('./src/Session'))();
const uri = process.argv[2] || 'http://localhost:9000/index.vxml';

session.call(uri);
