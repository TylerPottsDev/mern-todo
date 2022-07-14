import { ICustomHttpError } from '../../types/error';
import { CustomHttpError } from './http.error';

export class BadRequestError extends CustomHttpError {
  constructor(options?: Partial<ICustomHttpError>) {
    super({
      statusCode: 400,
      kind: 'BAD_REQUEST',
      message: 'Bad Request',
      ...options
    });
  }
}
