import { Router } from 'express';
import {
	create,
	getAll,
	getOne,
	remove,
	update,
} from '../../controllers/directores.controllers.js';

const directoresRouter = Router();

directoresRouter.get('/', getAll);
directoresRouter.get('/:id', getOne);
directoresRouter.post('/', create);
directoresRouter.delete('/:id', remove);
directoresRouter.put('/:id', update);

export default directoresRouter;
