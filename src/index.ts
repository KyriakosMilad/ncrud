#!/usr/bin/env node

import ncrud from 'commander';
import chalk from 'chalk';
import figlet from 'figlet';
import inquirer from 'inquirer';
import { errorHandler, checkFileExistAndAskToOverwrite } from './utils/helpers';
import fs from 'fs';
import createController from './utils/createController';
import createRoutes from './utils/createRoutes';
import createSchema from './utils/createSchema';

// dev
console.log('opts', process.argv);

ncrud
	.version('0.0.1')
	.helpOption('-h, --help', 'display help for ncrud')
	.description('Make CRUD files and stop wasting time doing same things')
	.option('-i, --init', 'create ncrud config')
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
	errorHandler(`unknown command '${process.argv.slice(2)[0]}'`, '001');
}

// check if multiple options wrote in wrong way
if (
	process.argv.slice(2).length &&
	process.argv.slice(2)[0].split('')[0] === '-' &&
	process.argv.slice(2)[0].split('')[1] !== '-' &&
	process.argv.slice(2)[0].length > 2
) {
	errorHandler(
		`unknown command ${
			process.argv.slice(2)[0]
		} multiple options usage: "ncrud -<first option> <first option value> -<second option> <second option value>"`,
		'002'
	);

	// set options to null
	ncrud.controller = '';
	ncrud.routs = '';
	ncrud.module = '';
	ncrud.schema = '';
}

// initialize ncrud and create ncrudconfig.json file
async function init(): Promise<void> {
	try {
		const overwriteNcrudConfig = await checkFileExistAndAskToOverwrite(
			'ncrudconfig.json'
		);

		// exit program if refused to overwrite or error happened
		if (!overwriteNcrudConfig) process.exit();

		const ncrudConfigAnswers = await inquirer.prompt([
			{
				name: 'srcDir',
				type: 'input',
				message: 'Where to create files?',
				default: '/src',
			},
		]);
		if (ncrudConfigAnswers) {
			fs.writeFileSync(
				'ncrudconfig.json',
				JSON.stringify(ncrudConfigAnswers, null, 2)
			);
		}

		process.exit();
	} catch {
		errorHandler("can't create ncrudconfig.json file!", '003');
	}
}

if (ncrud.init) {
	async function i(): Promise<void> {
		await init();
	}
	i();
}

// handle commands
async function executeCommands(): Promise<void> {
	if (ncrud.controller) {
		await createController(ncrud.controller);
	}

	if (ncrud.routes) {
		await createRoutes(ncrud.routes);
	}

	if (ncrud.schema) {
		await createSchema(ncrud.schema);
	}
}

executeCommands();
