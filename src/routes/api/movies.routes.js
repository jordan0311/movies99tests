import { Router } from 'express';
import {
	create,
	getAll,
	getOne,
	remove,
	setActors,
	setDirectors,
	setGenres,
	update,
} from '../../controllers/movies.controllers.js';

const movieRouter = Router();

movieRouter.get('/', getAll);
movieRouter.get('/:id', getOne);
movieRouter.post('/', create);
movieRouter.delete('/:id', remove);
movieRouter.put('/:id', update);

movieRouter.post('/:id/genres', setGenres);
movieRouter.post('/:id/directors', setDirectors);
movieRouter.post('/:id/actors', setActors);

export default movieRouter;
