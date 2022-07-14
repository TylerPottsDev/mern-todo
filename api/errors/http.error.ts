import { NextFunction, Request, Response } from 'express';
import { ICustomHttpError } from '../../types/error';

export class CustomHttpError extends Error implements ICustomHttpError {
  public statusCode: number;
  public kind: string = 'UNKNOWN';
  public reason: string = 'UNKNOWN';
  public field: string = null;
  public payload: any = {};
  public originalError: any | null | undefined;

  constructor({
    statusCode = 500,
    kind,
    reason,
    message,
    payload,
    originalError,
    field
  }: ICustomHttpError) {
    super();

    this.statusCode = statusCode;
    this.message = message || 'Something went wrong';
    this.payload = payload || {};
    this.originalError = originalError;
    this.field = field;

    if (kind) {
      this.kind = kind;
    }
    if (reason) {
      this.reason = reason;
    }
  }

  toString() {
    return JSON.stringify({
      statusCode: this.statusCode,
      kind: this.kind,
      reason: this.reason,
      payload: this.payload,
      message: this.message
    });
  }
}

type THandler = (
  req: Request,
  res: Response,
  next: NextFunction,
  ...args: any[]
) => any;

export function httpErrorHandlers(data: THandler | THandler[]): THandler[] {
  const handlers = Array.isArray(data) ? data : [data];

  return handlers.map((handler, idx) => {
    return async (
      req: Request,
      res: Response,
      next: NextFunction,
      ...args: any[]
    ) => {
      try {
        await handler(req, res, next, ...args);

        if (handlers.length - 1 !== idx) {
          next();
        }
      } catch (error) {
        console.log('httpErrorHandlers: ', error);

        res.status(error.statusCode || error.status || 500).json(error);
        return;
      }
    };
  });
}
