class BadRequestError extends Error {
  constructor(message = 'Invalid fields') {
    super(message);
    this.name = 'BadRequestError';
  }
}

module.exports = BadRequestError;