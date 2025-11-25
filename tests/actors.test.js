import request from 'supertest';
import app from '../src/app.js';

let id;

test('GET /actors - Obtener todos los actores', async () => {
	const res = await request(app).get('/actors');
	expect(res.status).toBe(200);
	expect(res.body).toBeInstanceOf(Array);
});

test('POST /actors - Crear un nuevo actor', async () => {
	const newActor = {
		first_name: 'Carlos',
		last_name: 'Gómez',
		nationality: 'Colombia',
		image: 'https://example.com/carlos-gomez.jpg',
		birthday: '1990-04-12',
	};

	const res = await request(app).post('/actors').send(newActor);

	expect(res.status).toBe(201);
	expect(res.body.first_name).toBe(newActor.first_name);
	expect(res.body.last_name).toBe(newActor.last_name);

	id = res.body.id; // guardamos para las siguientes pruebas
});

test('PUT /actors/:id - Actualizar un actor', async () => {
	const updatedActor = {
		first_name: 'Carlos Andrés',
	};

	const res = await request(app).put(`/actors/${id}`).send(updatedActor);

	expect(res.status).toBe(200);
	expect(res.body.first_name).toBe(updatedActor.first_name);
});

test('DELETE /actors/:id - Eliminar un actor por ID', async () => {
	const res = await request(app).delete(`/actors/${id}`);
	expect(res.status).toBe(204);
});
