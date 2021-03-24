export default (
	name: string,
	Model: string,
	Models: string,
	model: string,
	models: string
): string => {
	return `import mongoose, { Document, model, Model } from 'mongoose';

export interface I${Model} extends Document {
  
}

const ${Model}Schema = new mongoose.Schema(
  {

  }
);

const ${Model}: Model<I${Model}> = model('${Model}', ${Model}Schema);

export default ${Model};`;
};
