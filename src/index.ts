#!/usr/bin/env node

import ncrud from 'commander';
import chalk from 'chalk';
import figlet from 'figlet';
import pluralize from 'pluralize';
import { createController } from './utils/createController';

// dev
console.log('opts', process.argv);

ncrud
	.version('0.0.1')
	.helpOption('-h, --help', 'display help for ncrud')
	.description('Make CRUD files and stop wasting time doing same things')
	.option(
		'-m, --module <name>',
		"create module and it's schema, routes, dto(s) and controller"
	)
	.option('-c, --controller <name>', 'create controller')
	.option('-s, --schema <name>', 'create schema')
	.option('-r, --routes <name>', 'create routes')
	.parse(process.argv);

// check if there is any commands
if (!process.argv.slice(2).length) {
	console.log(
		chalk.red(figlet.textSync('ncrud', { horizontalLayout: 'full' }))
	);
	ncrud.outputHelp();
}

// check if command exist
if (
	process.argv.slice(2).length &&
	process.argv.slice(2)[0].split('')[0] !== '-'
) {
	console.log(`error: unknown command '${process.argv.slice(2)[0]}'`);
}

// check if multiple options wrote in wrong way
if (
	process.argv.slice(2).length &&
	process.argv.slice(2)[0].split('')[0] === '-' &&
	process.argv.slice(2)[0].split('')[1] !== '-' &&
	process.argv.slice(2)[0].length > 2
) {
	console.log(
		`error: unknown command ${
			process.argv.slice(2)[0]
		} multiple options usage: "ncrud -<first option> <first option value> -<second option> <second option value>"`
	);

	// set options to null
	ncrud.controller = '';
	ncrud.routs = '';
	ncrud.module = '';
	ncrud.schema = '';
}

// handle commands
async function executeCommands() {
	if (ncrud.controller) {
		await createController(pluralize(ncrud.controller));
	}

	// if (ncrud.routes) {
	// 	await createRoutes(pluralize(ncrud.routes));
	// }

	// if (ncrud.schema) {
	// 	await createSchema(pluralize(ncrud.schema));
	// }

	// if (ncrud.module) {
	// 	await createModule(ncrud.module);
	// }
}

executeCommands();
