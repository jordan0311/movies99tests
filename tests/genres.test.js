import request from 'supertest';
import app from '../src/app.js';

let id;

test('GET /genres - Obtener todos los generos', async () => {
	const res = await request(app).get('/genres');
	expect(res.status).toBe(200);
	expect(res.body).toBeInstanceOf(Array);
	console.log(res.body);
});

test('POST /genres - Crear un nuevo genero', async () => {
	const newGenre = { name: 'terror' };
	const res = await request(app).post('/genres').send(newGenre);
	id = res.body.id;
	expect(res.status).toBe(201);
	expect(res.body.name).toBe(newGenre.name);
	console.log('Name:', res.body.name);
});
test('PUT /genres/:id - Actualizar un genero', async () => {
	const updatedGenre = { name: 'anime' };
	const res = await request(app).put(`/genres/${id}`).send(updatedGenre);
	expect(res.status).toBe(200);
	expect(res.body.name).toBe(updatedGenre.name);
	console.log('Updated Name:', res.body.name);
});

test('DELETE /genres/:id - Eliminar un genero por ID', async () => {
	const res = await request(app).delete(`/genres/${id}`);
	expect(res.status).toBe(204);
});
