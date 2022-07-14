import { CustomHttpError } from './http.error';
import { ICustomHttpError } from '../../types/error';

export class InternalServerError extends CustomHttpError {
  constructor(options?: Partial<ICustomHttpError>) {
    super({
      statusCode: 500,
      kind: 'INTERNAL_SERVER_ERROR',
      message: 'Internal Server Error',
      ...options
    });
  }
}
