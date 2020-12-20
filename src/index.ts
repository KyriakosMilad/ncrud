#!/usr/bin/env node

import ncrud from 'commander';
import chalk from 'chalk';
import figlet from 'figlet';

console.log(
	chalk.red(figlet.textSync('ncrud', { horizontalLayout: 'full' }))
);

// dev
console.log('opts', process.argv);

ncrud
	.version('0.0.1')
	.helpOption('-h, --help', 'display help for ncrud')
	.description(
		'Make CRUD files and stop wasting time doing same things'
	)
	.option(
		'-m, --module <name>',
		"create module and it's schema, routes, dto(s) and controller"
	)
	.option('-c, --controller <name>', 'create controller')
	.option('-s, --schema <name>', 'create schema')
	.option('-r, --route <name>', 'create route')
	.option('-d, --dto <name>', 'create dto')
	.parse(process.argv);
