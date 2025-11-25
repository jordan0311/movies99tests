import request from 'supertest';
import app from '../src/app.js';

let id;

test('GET /directors - Obtener todos los directors', async () => {
	const res = await request(app).get('/directors');
	expect(res.status).toBe(200);
	expect(res.body).toBeInstanceOf(Array);
});

test('POST /directors - Crear un nuevo director', async () => {
	const newDirector = {
		first_name: 'Christopher',
		last_name: 'Nolan',
		nationality: 'Reino Unido',
		image:
			'https://upload.wikimedia.org/wikipedia/commons/6/67/Christopher_Nolan_Cannes_2018.jpg',
		birthday: '1970-07-30',
	};

	const res = await request(app).post('/directors').send(newDirector);

	expect(res.status).toBe(201);
	expect(res.body.first_name).toBe(newDirector.first_name);
	expect(res.body.last_name).toBe(newDirector.last_name);

	id = res.body.id;
});

test('PUT /directors/:id - Actualizar un director', async () => {
	const updatedDirectors = { first_name: 'Chris' };

	const res = await request(app).put(`/directors/${id}`).send(updatedDirectors);

	expect(res.status).toBe(200);
	expect(res.body.first_name).toBe(updatedDirectors.first_name);

	console.log('Updated Name:', res.body.first_name);
});

test('DELETE /directors/:id - Eliminar un director por ID', async () => {
	const res = await request(app).delete(`/directors/${id}`);
	expect(res.status).toBe(204);
});
