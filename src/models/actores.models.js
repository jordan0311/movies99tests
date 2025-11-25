import db from '../db/connect.js';
import { DataTypes } from 'sequelize';

export const Actor = db.define('Actor', {
	first_name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	last_name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	nationality: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	image: {
		type: DataTypes.TEXT,
		allowNull: false,
	},

	birthday: {
		type: DataTypes.DATEONLY,
		allowNull: false,
	},
});
