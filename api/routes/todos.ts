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

todoRouter.get('/', httpErrorHandlers(getTodoListController));
todoRouter.post('/', httpErrorHandlers(createTodoController));
todoRouter.put('/:id', httpErrorHandlers(updateTodoController));
todoRouter.delete('/:id', httpErrorHandlers(deleteTodoController));
// actions
todoRouter.put('/:id/toggle-completion', httpErrorHandlers(toggleCompletionTodoController));

export { todoRouter };
