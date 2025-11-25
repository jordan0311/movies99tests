import { Router } from 'express';
import {
	create,
	getAll,
	getOne,
	remove,
	update,
} from '../../controllers/actores.controllers.js';

const actorRouter = Router();

actorRouter.get('/', getAll);
actorRouter.get('/:id', getOne);
actorRouter.post('/', create);
actorRouter.delete('/:id', remove);
actorRouter.put('/:id', update);

export default actorRouter;
