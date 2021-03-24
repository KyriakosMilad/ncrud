export default (
	name: string,
	Model: string,
	Models: string,
	model: string,
	models: string
): string => {
	return `import express from 'express';
import validationErrorHandler from '../middlewares/validationErrorHandler';
import create${Model}Dto from './create${Model}.dto';
import update${Model}Dto from './update${Model}.dto';

import {
  get${Models},
  find${Model},
  create${Model},
  update${Model},
  delete${Model},
} from './${models}.controller';

const router = express.Router();

router
  .route('/')
  .get(get${Models})
  .post(validationErrorHandler(create${Model}Dto), create${Model});
router
  .route('/:id')
  .get(find${Model})
  .put(validationErrorHandler(update${Model}Dto), update${Model})
  .delete(delete${Model});

export default router;`;
};
