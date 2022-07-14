import { ValidatorMiddleware } from '../middlewares/validator';
import { TodoModel } from '../models/Todo';
import { YupSharedTypes, Yup } from '../lib/yup';
import { ICreateTodoDTO } from '../../types/todo';
import { Request, Response } from 'express';
import { NotFoundError } from '../errors';

export const getTodoListController = [
  async (req: Request, res: Response) => {
    const todos = await TodoModel.find().lean();

    res.json(todos);
  }
];

export const createTodoController = [
  ValidatorMiddleware({
    body: Yup.object({
      text: YupSharedTypes.todo.text.required()
    })
  }),
  async (req: Request<{}, {}, ICreateTodoDTO>, res: Response) => {
    const todo = new TodoModel({
      text: req.body.text
    });

    await todo.save();

    res.status(200).json(todo);
  }
];

export const updateTodoController = [
  ValidatorMiddleware({
    params: Yup.object({
      id: YupSharedTypes.id.required()
    }),
    body: Yup.object({
      text: YupSharedTypes.todo.text
    })
  }),
  async (req: Request, res: Response) => {
    const todo = await TodoModel.findOne({
      id: req.params.id
    });

    if (!todo) {
      throw new NotFoundError({
        message: 'ToDo not found'
      })
    }

    const updatedTodo = await todo.update({
      text: req.body.text
    }, {
      lean: true,
      new: true
    });

    res.status(200).json(updatedTodo);
  }
];

export const deleteTodoController = [
  ValidatorMiddleware({
    params: Yup.object({
      id: YupSharedTypes.id.required()
    }),
  }),
  async (req: Request, res: Response) => {
    const todo = await TodoModel.findById(req.params.id);

    if (!todo) {
      throw new NotFoundError({
        message: 'ToDo not found'
      })
    }

    const result = await todo.remove();

    res.json({ result });
  }
];

export const toggleCompletionTodoController = [
  ValidatorMiddleware({
    params: Yup.object({
      id: YupSharedTypes.id.required()
    }),
  }),
  async (req: Request, res: Response) => {
    const todo = await TodoModel.findById(req.params.id);

    if (!todo) {
      throw new NotFoundError({
        message: 'ToDo not found'
      })
    }

    todo.complete = !todo.complete;

    await todo.save();

    res.status(200).json(todo);
  }
];