import * as yup from 'yup';

export const Yup = yup;

export const YupSharedTypes = {
  id: Yup.string(),
  todo: {
    text: Yup.string().min(1)
  }
};
