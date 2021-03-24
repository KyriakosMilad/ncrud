import pluralize from 'pluralize';
import {
	capitalize,
	checkFileExistAndAskToOverwrite,
	errorHandler,
	getValueFromConfig,
} from './helpers';
import controllerTemplate from './templates/controller.template';
import fs from 'fs';

export default async (name: string): Promise<void> => {
	try {
		const Model: string = capitalize(pluralize.singular(name));
		const Models: string = capitalize(pluralize(name));
		const model: string = Model.toLowerCase();
		const models: string = Models.toLowerCase();

		const content: string = controllerTemplate(name, Model, Models, model, models);

		const srcDir = getValueFromConfig('srcDir');
		const dir: string = `${srcDir}/${models}`;
		const filename: string = `${dir}/${models}.controller.ts`;

		// make directory if not exist
		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir, { recursive: true });
		}

		const overwrite = await checkFileExistAndAskToOverwrite(filename);

		// exit program if refused to overwrite or error happened
		if (!overwrite) process.exit();

		fs.writeFileSync(filename, content, { encoding: 'utf8' });

		console.log(`${filename} created successfully`);
	} catch (err) {
		errorHandler(`error happened cannot create controllerFile, ${err}`, '005');
		process.exit();
	}
};
