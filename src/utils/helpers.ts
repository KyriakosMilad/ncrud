export const errorHandler = async (
	error: string,
	code: number
): Promise<void> => {
	console.log(`ncrud error ${code}: ${error}`);
};
