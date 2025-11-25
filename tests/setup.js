import sequelize from '../src/db/connect.js';

beforeAll(async () => {
	await sequelize.sync();
});

afterAll(async () => {
	await sequelize.close();
});
