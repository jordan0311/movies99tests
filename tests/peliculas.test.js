import request from 'supertest';
import app from '../src/app.js';
import { Genre } from '../src/models/genero.models.js';
import { Actor } from '../src/models/actores.models.js';
import { Director } from '../src/models/directores.models.js';
import { Movie } from '../src/models/movies.models.js';

let movieId;

describe('Tests de Movies', () => {
	test('POST /movies - Crear una película', async () => {
		const newMovie = {
			name: 'Inception',
			image: 'https://image.com',
			synopsis: 'Una película sobre sueños.',
			releaseYear: 2010,
		};

		const res = await request(app).post('/movies').send(newMovie);
		movieId = res.body.id; // <<< Guardar ID real

		expect(res.status).toBe(201);
		expect(res.body.name).toBe(newMovie.name);
	});

	test('GET /movies/:id - Obtener una película por ID', async () => {
		const res = await request(app).get(`/movies/${movieId}`);

		expect(res.status).toBe(200);
		expect(res.body.id).toBe(movieId);
	});

	test('PUT /movies/:id - Actualizar una película', async () => {
		const updatedMovie = {
			name: 'Inception Updated',
			synopsis: 'Actualización de la película.',
		};

		const res = await request(app).put(`/movies/${movieId}`).send(updatedMovie);

		expect(res.status).toBe(200);
		expect(res.body.name).toBe(updatedMovie.name);
	});

	test('POST /movies/:id/genres - Asignar géneros a una película', async () => {
		// Crear géneros reales
		const g1 = await Genre.create({ name: 'terror' });
		const g2 = await Genre.create({ name: 'accion' });

		const res = await request(app)
			.post(`/movies/${movieId}/genres`)
			.send([g1.id, g2.id]);

		expect(res.status).toBe(200);
		expect(res.body).toBeInstanceOf(Array);
	});

	test('POST /movies/:id/directors - Asignar directores a una película', async () => {
		const director = await Director.create({
			first_name: 'Christopher',
			last_name: 'Nolan',
			nationality: 'Reino Unido',
			image: 'https://image.com',
			birthday: '1970-07-30',
		});

		const res = await request(app)
			.post(`/movies/${movieId}/directors`)
			.send([director.id]);

		expect(res.status).toBe(200);
		expect(res.body).toBeInstanceOf(Array);
	});

	test('POST /movies/:id/actors - Asignar actores a una película', async () => {
		const actor = await Actor.create({
			first_name: 'Adam',
			last_name: 'Sandler',
			nationality: 'USA',
			image: 'https://image.com',
			birthday: '1966-09-09',
		});

		const res = await request(app)
			.post(`/movies/${movieId}/actors`)
			.send([actor.id]);

		expect(res.status).toBe(200);
		expect(res.body.id).toBe(movieId);
	});

	test('DELETE /movies/:id - Eliminar una película', async () => {
		const res = await request(app).delete(`/movies/${movieId}`);
		expect(res.status).toBe(204);
	});
});
