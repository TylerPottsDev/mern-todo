import {
  createTodoController,
  deleteTodoController,
  getTodoListController,
  toggleCompletionTodoController,
  updateTodoController
} from '../controllers/todo';
import express from 'express';
import { httpErrorHandlers } from '../errors/http.error';


const todoRouter = express.Router();

todoRouter.get('/todos', httpErrorHandlers(getTodoListController));
todoRouter.post('/todos', httpErrorHandlers(createTodoController));
todoRouter.put('/todos/:id', httpErrorHandlers(updateTodoController));
todoRouter.delete('/todos/:id', httpErrorHandlers(deleteTodoController));
// actions
todoRouter.post('/todos/:id/toggle-completion', httpErrorHandlers(toggleCompletionTodoController));

export { todoRouter };
