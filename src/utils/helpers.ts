import fs from 'fs';
import inquirer from 'inquirer';

export const errorHandler = async (
	error: string,
	code: string
): Promise<void> => {
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
