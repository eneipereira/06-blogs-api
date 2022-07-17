const loginService = require('../services/loginService');
const userService = require('../services/userService');

const userController = {
  /** @type {import('express').RequestHandler} */
  async create(req, res) {
    const data = await userService.validateBodyUser(req.body);
    
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
  
  /** @type {import('express').RequestHandler} */
  async getById(req, res) {
    const token = req.headers.authorization;
    
    await loginService.readToken(token);
    
    const { id } = await userService.validateParamsId(req.params);
    
    const user = await userService.getById(id);
    
    res.status(200).json(user);
  },
  
  /** @type {import('express').RequestHandler} */
  async remove(req, res) {
    const token = req.headers.authorization;
    
    const { id } = await loginService.readToken(token);

    await userService.remove(id);

    res.sendStatus(204);
  },
};

module.exports = userController;