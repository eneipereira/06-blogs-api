const { Router } = require('express');
const userController = require('../controllers/userController');

const userRoute = Router();

userRoute.route('/')
.post(userController.create)
.get(userController.getAll);

module.exports = userRoute;