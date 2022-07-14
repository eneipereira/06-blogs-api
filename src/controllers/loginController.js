const loginService = require('../services/loginService');

const loginController = {
  /** @type {import('express').RequestHandler} */
  async login(req, res) {
    const data = await loginService.validateBodyLogin(req.body);

    const user = await loginService.getByEmail(data.email, data.password);

    const token = await loginService.makeToken(user);

    res.status(200).json({ token });
  },
};

module.exports = loginController;