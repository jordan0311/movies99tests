import db from '../db/connect.js';
import { DataTypes } from 'sequelize';
import { Genre } from './genero.models.js';
import { Director } from './directores.models.js';
import { Actor } from './actores.models.js';

export const Movie = db.define('Movie', {
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	image: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	synopsis: {
		type: DataTypes.TEXT,
	},
	release_year: {
		type: DataTypes.INTEGER,
	},
});

Movie.belongsToMany(Genre, { through: 'Movies_genres' });
Genre.belongsToMany(Movie, { through: 'Movies_genres' });

Movie.belongsToMany(Director, { through: 'movies_directores' });
Director.belongsToMany(Movie, { through: 'movies_directores' });

Movie.belongsToMany(Actor, { through: 'movies_actores' });
Actor.belongsToMany(Movie, { through: 'movies_actores' });
