export default (
	name: string,
	Model: string,
	Models: string,
	model: string,
	models: string
): string => {
	return `import { RequestHandler } from 'express';
import asyncHandler from '../middlewares/asyncHandler.middleware';
import HttpException from '../utils/HttpException';
import ${Model}Schema, { I${Model} } from './${models}.schema';

/**
 * @desc			Find ${model} by id
 * @access		DEV METHOD
 */
export const find${Model}ById = async (
	id: string
): Promise<I${Model} | null> => {
	try {
		return await ${Model}Schema.findById(id);
	} catch {
		return null;
	}
};

/**
 * @desc			Get ${model} by id
 * @access		PUBLIC
 */
	export const find${Model}: RequestHandler = asyncHandler(
	async (req, res, next) => {
		const ${model} = await find${Model}ById(req.params.id);

		if (!${model})
			return next(new HttpException('No ${model} found with this id', 404));

		res.status(200).json({
			success: true,
			message: '${Model} found',
			data: ${model}
		});
	}
);

/**
 * @desc			Create new ${model}
 * @access		AUTH
 */
export const create${Model}: RequestHandler = asyncHandler(
	async (req, res, next) => {
		// create ${model}
		const ${model} = await ${Model}Schema.create({

		});

		res.status(200).json({
			success: true,
			message: '${Model} created successfully',
		});
	}
);

/**
 * @desc			Get all ${models} with pagination
 * @access		PUBLIC
 */
export const get${Models}: RequestHandler = asyncHandler(
	async (req, res, next) => {
		// process params data
		const page = parseInt(req.query.page as string, 10) || 1;
		const limit = parseInt(req.query.limit as string, 10) || 25;
		if (limit > 200) return next(new HttpException('Maximum limit is 200', 429));

		const startIndex = (page - 1) * limit;
		const endIndex = page * limit;
		
		const ${models} = await ${Model}Schema.find({}).skip(startIndex).limit(limit);
		const total = await ${Model}Schema.find({}).countDocuments();

		// pagination result
		const pagination: {
			next?: number;
			prev?: number;
		} = {};

		if (endIndex < total) pagination.next = page + 1;

		if (startIndex > 0) pagination.prev = page - 1;

		res.status(200).json({
			success: true,
			data: ${models},
			pagination,
		});
	}
);

/**
 * @desc			Update ${model}
 * @access		PUBLIC
 */
export const update${Model}: RequestHandler = asyncHandler(
	async (req, res, next) => {
		// find ${model} by id
		const ${model} = await find${Model}ById(req.params.id);

		// check if ${model} exist
		if (!${model})
			return next(new HttpException('No ${model} found with this id', 422));

		// update ${model}
		await ${model}.updateOne({ name: req.body.newName });

		return res.status(200).json({
			success: true,
			message: '${Model} updated successfully',
		});
	}
);

/**
 * @desc			Delete ${model}
 * @access		AUTH
 */
export const delete${Model}: RequestHandler = asyncHandler(
	async (req, res, next) => {
		// find ${model} by id
		const ${model} = await find${Model}ById(req.params.id);

		// check if ${model} exist
		if (!${model})
			return next(new HttpException('No ${model} found with this id', 422));

		// delete ${model}
		await ${model}.deleteOne();

		return res.status(200).json({
			success: true,
			message: '${Model} deleted successfully',
		});
	}
);`;
};
