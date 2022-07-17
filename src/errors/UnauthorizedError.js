class UnauthorizedError extends Error {
  constructor(message = 'Unauthorized user') {
    super(message);
    this.name = 'UnauthorizedError';
  }
}

module.exports = UnauthorizedError;