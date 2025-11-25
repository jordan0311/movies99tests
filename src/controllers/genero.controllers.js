import { catchError } from '../middlewares/catchError.js';
import { Genre } from '../models/genero.models.js';
import { Movie } from '../models/movies.models.js';

export const getAll = catchError(async (req, res) => {
	const genres = await Genre.findAll({ include: [Movie] });
	res.json(genres);
});

export const getOne = catchError(async (req, res) => {
	const { id } = req.params;
	const genre = await Genre.findByPk(id);
	if (!genre) return res.status(404).json({ message: 'genero no exite' });
	res.json(genre);
});

export const create = catchError(async (req, res) => {
	const genre = await Genre.create(req.body);
	res.status(201).json(genre);
});

export const remove = catchError(async (req, res) => {
	const { id } = req.params;
	await Genre.destroy({ where: { id } });
	res.status(204).end();
});

export const update = catchError(async (req, res) => {
	const { id } = req.params;

	const generosEdited = await Genre.update(req.body, { where: { id } });

	if (generosEdited[0] === 0) {
		return res.status(404).json({ message: 'no se pudo realizar' });
	}

	const generoActualizado = await Genre.findByPk(id);

	return res.json(generoActualizado);
});
