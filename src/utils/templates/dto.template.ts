export default (
	name: string,
	action: string,
	Model: string,
	Models: string,
	model: string,
	models: string
): string => {
	return `import {} from 'class-validator';

export default class ${action + Model}Dto {
  
}`;
};
