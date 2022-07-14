class UserNotFound extends Error {
  constructor(message = 'Invalid fields') {
    super(message);
    this.name = 'UserNotFound';
  }
}

module.exports = UserNotFound;