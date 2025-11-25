import { catchError } from '../middlewares/catchError.js';

import { Director } from '../models/directores.models.js';

export const getAll = catchError(async (req, res) => {
	const directores = await Director.findAll();
	res.json(directores);
});

export const getOne = catchError(async (req, res) => {
	const { id } = req.params;
	const direc = await Director.findByPk(id);
	if (!direc) return res.status(404).json({ message: 'directores no exite' });
	res.json(direc);
});

export const create = catchError(async (req, res) => {
	const direct = await Director.create(req.body);
	res.status(201).json(direct);
});

export const remove = catchError(async (req, res) => {
	const { id } = req.params;
	await Director.destroy({ where: { id } });
	res.status(204).end();
});

export const update = catchError(async (req, res) => {
	const { id } = req.params;

	const directorEdited = await Director.update(req.body, { where: { id } });

	if (directorEdited[0] === 0) {
		return res
			.status(404)
			.json({ message: 'No se pudo actualizar (no encontrado)' });
	}

	const director = await Director.findByPk(id);

	return res.json(director);
});
