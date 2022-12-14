const { Router } = require('express');
const userController = require('../controllers/userController');

const userRoute = Router();

userRoute.route('/:id')
.get(userController.getById);

userRoute.delete('/me', userController.remove);

userRoute.route('/')
.post(userController.create)
.get(userController.getAll);

module.exports = userRoute;