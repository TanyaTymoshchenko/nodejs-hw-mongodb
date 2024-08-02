import { HttpError } from 'http-errors';

export const errorHandler = (error, req, res, next) => {
  if (error instanceof HttpError) {
    res.status(error.status).send({
      status: error.status,
      name: error.name,
      data: error.message,
    });
    return;
  }

  res.status(500).send({
    status: 500,
    name: 'Something went wrong',
    data: error.message,
  });
};