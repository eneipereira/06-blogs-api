const errors = {
  ValidationError: 400,
  UserNotFoundError: 400,
  JsonWebTokenError: 401,
  NotFoundError: 404,
  ConflictError: 409,
};

/**
 * 
 * @param {Error} err 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {import('express').NextFunction} next 
 */

const errorHandler = (err, _req, res, _next) => {
  const status = errors[err.name];

  if (!status) {
    res.sendStatus(500);
    return;
  }

  res.status(status).json({ message: err.message });
};

module.exports = errorHandler;