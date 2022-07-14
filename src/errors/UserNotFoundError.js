class UserNotFoundError extends Error {
  constructor(message = 'Invalid fields') {
    super(message);
    this.name = 'UserNotFoundError';
  }
}

module.exports = UserNotFoundError;