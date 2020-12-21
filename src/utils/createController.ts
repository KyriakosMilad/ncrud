export const createController = async (name: string): Promise<void> => {
	try {
		console.log(name);
	} catch {
		console.log('error happened!');
	}
};
