import { catchError } from '../middlewares/catchError.js';
import { Actor } from '../models/actores.models.js';
import { Movie } from '../models/movies.models.js';

export const getAll = catchError(async (req, res) => {
	const actores = await Actor.findAll({ include: [Movie] });
	res.json(actores);
});

export const getOne = catchError(async (req, res) => {
	const { id } = req.params;
	const actor = await Actor.findByPk(id);
	if (!actor) return res.status(404).json({ message: 'actor no exite' });
	res.json(actor);
});

export const create = catchError(async (req, res) => {
	const actor = await Actor.create(req.body);
	res.status(201).json(actor);
});

export const remove = catchError(async (req, res) => {
	const { id } = req.params;
	await Actor.destroy({ where: { id } });
	res.status(204).end();
});

export const update = catchError(async (req, res) => {
	const { id } = req.params;

	const actorEdited = await Actor.update(req.body, { where: { id } });

	if (actorEdited[0] === 0) {
		return res
			.status(404)
			.json({ message: 'No se pudo actualizar (no encontrado)' });
	}

	const actor = await Actor.findByPk(id);

	return res.json(actor);
});
