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
  
  /** @type {import('express').RequestHandler} */
  async getAll(req, res) {
    const token = req.headers.authorization;

    await loginService.readToken(token);
    
    const allUsers = await userService.getAll();

    res.status(200).json(allUsers);
  },
};

module.exports = userController;