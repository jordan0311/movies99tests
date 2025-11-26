import { Router } from 'express';
import apiRoutes from './api/index.js';

const router = Router();

router.get('/', (req, res) => {
	res.json({ message: 'Welcome to the API' });
});

router.use('/api', apiRoutes);

export default router;
