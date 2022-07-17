const { Router } = require('express');
const postController = require('../controllers/postController');

const postRoute = Router();

postRoute.route('/:id')
.get(postController.getById)
.put(postController.edit)
.delete(postController.remove);

postRoute.route('/')
.post(postController.create)
.get(postController.getAll);

module.exports = postRoute;