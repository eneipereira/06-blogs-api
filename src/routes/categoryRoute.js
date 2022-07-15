const { Router } = require('express');
const categoryController = require('../controllers/categoryController');

const categoryRoute = Router();

categoryRoute.route('/')
.post(categoryController.create)
.get(categoryController.getAll);

module.exports = categoryRoute;