import express from 'express';
import { todoRouter } from './todos';

const apiRouter = express.Router();

apiRouter.use('/todo', todoRouter);

export { apiRouter };
