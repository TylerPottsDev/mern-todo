export interface IFieldError {
  key: string;
  message: string;
}

export interface ICustomHttpError {
  statusCode?: number;
  kind?: string;
  reason?: string;
  payload?: any;
  message?: string;
  originalError?: any;
  field?: string;
}

