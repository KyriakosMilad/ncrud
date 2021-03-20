import fs from 'fs';
import inquirer from 'inquirer';

export const errorHandler = (error: string, code: string): void => {
	console.log(`ncrud error ${code}: ${error}`);
};

export const checkFileExistAndAskToOverwrite = async (
	uri: string
): Promise<boolean> => {
	try {
		if (fs.existsSync(uri)) {
			const askToOverwriteAnswer = await inquirer.prompt([
				{
					name: 'overwrite',
					type: 'confirm',
					message: `${uri} already exist, overwrite it?`,
				},
			]);
			return askToOverwriteAnswer.overwrite;
		} else {
			return true;
		}
	} catch {
		return false;
	}
};

export const capitalize = (s: string): string => {
	return s[0].toUpperCase() + s.slice(1);
};

export const getValueFromConfig = (key: string): string => {
	if (!fs.existsSync('ncrudconfig.json')) {
		console.log('error happened: cannot reach ncrudconfig.json', '004');
		process.exit();
	}

	const ncrud = JSON.parse(
		fs.readFileSync('ncrudconfig.json', { encoding: 'utf8' })
	);

	if (!ncrud || !ncrud[key]) {
		console.log(`error happened: key ${key} is not exist, run ncrud -i`, '004');
		process.exit();
	}

	return ncrud[key];
};
