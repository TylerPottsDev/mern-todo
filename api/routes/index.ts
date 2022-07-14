import express from 'express';
import { todoRouter } from './todos';

const apiRouter = express.Router();

apiRouter.use('/todos', todoRouter);

export { apiRouter };
