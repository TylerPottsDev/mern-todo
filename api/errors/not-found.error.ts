import { CustomHttpError } from './http.error';
import { ICustomHttpError } from '../types/error';

export class NotFoundError extends CustomHttpError {
  constructor(options?: Partial<ICustomHttpError>) {
    super({
      statusCode: 404,
      kind: 'NOT_FOUND',
      message: 'Not Found',
      ...options
    });
  }
}
