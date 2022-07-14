const loginService = require('../services/loginService');
const userService = require('../services/userService');

const userController = {
  /** @type {import('express').RequestHandler} */
  async create(req, res) {
    const data = await userService.validateBodyCreate(req.body);

    const newUser = await userService.create(data);

    const token = await loginService.makeToken(newUser);

    res.status(201).json({ token });
  },
};

module.exports = userController;