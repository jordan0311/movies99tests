import db from '../db/connect.js';
import { DataTypes } from 'sequelize';

export const Genre = db.define('Genre', {
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});
