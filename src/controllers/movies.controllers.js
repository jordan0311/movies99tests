import { catchError } from '../middlewares/catchError.js';
import { Actor } from '../models/actores.models.js';
import { Director } from '../models/directores.models.js';
import { Genre } from '../models/genero.models.js';
import { Movie } from '../models/movies.models.js';

export const getAll = catchError(async (req, res) => {
	const movies = await Movie.findAll({ include: [Genre, Director, Actor] });
	res.json(movies);
});

export const getOne = catchError(async (req, res) => {
	const { id } = req.params;
	const movie = await Movie.findByPk(id);
	if (!movie) return res.status(404).json({ message: 'movies no exite' });
	res.json(movie);
});

export const create = catchError(async (req, res) => {
	const movie = await Movie.create(req.body);
	res.status(201).json(movie);
});

export const remove = catchError(async (req, res) => {
	const { id } = req.params;
	await Movie.destroy({ where: { id } });
	res.status(204).end();
});

export const update = catchError(async (req, res) => {
	const { id } = req.params;
	const moviesEdited = await Movie.update(req.body, { where: { id } });
	if (moviesEdited[0] === 0)
		return res.status(404).json({ message: 'no se puedo realizar ' });
	const movi23 = await Movie.findByPk(id);
	return res.json(movi23);
});

export const setGenres = catchError(async (req, res) => {
	const { id } = req.params;

	const movie = await Movie.findByPk(id);
	if (!movie) return res.status(404).json({ message: 'Movie not found' });

	if (!Array.isArray(req.body)) {
		return res
			.status(400)
			.json({ message: 'Body must be an array of genre IDs' });
	}

	const genres = await Genre.findAll({ where: { id: req.body } });

	if (genres.length !== req.body.length) {
		return res.status(400).json({ message: 'Some genre IDs do not exist' });
	}

	await movie.setGenres(req.body);

	const result = await movie.getGenres();

	res.json(result);
});

export const setDirectors = catchError(async (req, res) => {
	const { id } = req.params;
	const movie = await Movie.findByPk(id);
	if (!movie) return res.status(404).json({ message: 'Movie not found' });

	await movie.setDirectors(req.body);

	const directors = await movie.getDirectors();

	res.json(directors);
});

export const setActors = catchError(async (req, res) => {
	const { id } = req.params;

	const movie = await Movie.findByPk(id);
	await movie.setActors(req.body);

	const movieUpdated = await Movie.findByPk(id, {
		include: [Actor, Director, Genre],
	});

	res.json(movieUpdated);
});
