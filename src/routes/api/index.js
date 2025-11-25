import { Router } from 'express';

import genreRouter from './generos.routes.js';
import actorRouter from './actor.routes.js';
import directoresRouter from './directores.routes.js';
import movieRouter from './movies.routes.js';

const apiRouter = Router();

apiRouter.use('/genres', genreRouter);
apiRouter.use('/actors', actorRouter);
apiRouter.use('/directors', directoresRouter);
apiRouter.use('/movies', movieRouter);

export default apiRouter;
