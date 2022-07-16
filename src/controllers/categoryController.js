const categoryService = require('../services/categoryService');
const loginService = require('../services/loginService');

const categoryController = {
  /** @type {import('express').RequestHandler} */
  async create(req, res) {
    const token = req.headers.authorization;
    
    await loginService.readToken(token);
    
    const data = await categoryService.validateBodyCategory(req.body);
    
    const newCategory = await categoryService.create(data);
    
    res.status(201).json(newCategory);
  },
  
  /** @type {import('express').RequestHandler} */
  async getAll(req, res) {
    const token = req.headers.authorization;
    
    await loginService.readToken(token);

    const allCategories = await categoryService.getAll();

    res.status(200).json(allCategories);
  },
};

module.exports = categoryController;