import { Request } from 'express';
import * as yup from 'yup';
import { BadRequestError, InternalServerError } from '../errors';

type TSchema = yup.AnySchema;

type TValidators = {
  body?: TSchema;
  params?: TSchema;
  query?: TSchema;
  files?: TSchema;
};

type TValidatorsKey = keyof TValidators;

export function ValidatorMiddleware(validators: TValidators) {
  return async function (req: Request) {
    try {
      const promises: any[] = [];

      for (const key in validators) {
        if (Object.prototype.hasOwnProperty.call(validators, key)) {
          const validator = validators[key as TValidatorsKey];
          const data = req[key as TValidatorsKey];

          if (data && validator) {
            promises.push(validator.validate(data));
          }
        }
      }

      if (promises.length > 0) {
        await Promise.all(promises);
      }
    } catch (err) {
      if (yup.ValidationError.isError(err)) {
        throw new BadRequestError({
          message: err.message,
          reason: 'VALIDATION',
          field: err.path
        });
      }

      throw new InternalServerError(err);
    }
  };
}
