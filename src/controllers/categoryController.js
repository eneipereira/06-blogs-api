const categoryService = require('../services/categoryService');
const loginService = require('../services/loginService');

const categoryController = {
  /** @type {import('express').RequestHandler} */
  async create(req, res) {
    const token = req.headers.authorization;
    
    const data = await categoryService.validateBodyCreate(req.body);
    
    await loginService.readToken(token);
    
    const newCategory = await categoryService.create(data);
    
    res.status(201).json(newCategory);
  },
};

module.exports = categoryController;