import { Router } from 'express';
import {
	create,
	getAll,
	getOne,
	remove,
	update,
} from '../../controllers/genero.controllers.js';

const genreRouter = Router();

genreRouter.get('/', getAll);
genreRouter.get('/:id', getOne);
genreRouter.post('/', create);
genreRouter.delete('/:id', remove);
genreRouter.put('/:id', update);

export default genreRouter;
