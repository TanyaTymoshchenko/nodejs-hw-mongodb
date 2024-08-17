import { HttpError } from 'http-errors';

<<<<<<< Updated upstream
export const errorHandler = (error, req, res, next) => {
  if (error instanceof HttpError) {
    const response = {
      status: error.status,
      // name: error.name,
      data: error.message,
    };

    if (error.errors) {
      response.errors = error.errors;
    }

    res.status(error.status).send(response);
=======
export const errorHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    res.status(err.status).json({
      status: err.status,
      message: err.name,
      data: err,
    });
>>>>>>> Stashed changes
    return;
  }

  res.status(500).json({
    status: 500,
<<<<<<< Updated upstream
    name: 'Something went wrong',
    data: error.message,
=======
    message: 'Something went wrong',
    error: err.message,
>>>>>>> Stashed changes
  });
};