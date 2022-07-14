class ConflictError extends Error {
  constructor(message = 'User already registered') {
    super(message);
    this.name = 'ConflictError';
  }
}

module.exports = ConflictError;