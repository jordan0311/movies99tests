import { Router } from 'express';
import apiRoutes from './api/index.js';
import directoresRouter from './api/directores.routes.js';
import actorRouter from './api/actor.routes.js';
import genreRouter from './api/generos.routes.js';
import movieRouter from './api/movies.routes.js';

const router = Router();

router.get('/', (req, res) => {
	res.json({ message: 'Welcome to the API' });
});

router.use('/api', apiRoutes);
router.use('/api/movies', movieRouter);
router.use('/api/genres', genreRouter);
router.use('/api/actors', actorRouter);
router.use('/api/directors', directoresRouter);

export default router;
