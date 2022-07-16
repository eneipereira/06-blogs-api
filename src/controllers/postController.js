const loginService = require('../services/loginService');
const postService = require('../services/postService');

const postController = {
  /** @type {import('express').RequestHandler} */
  async create(req, res) {
    const token = req.headers.authorization;

    const { id } = await loginService.readToken(token);

    const data = await postService.validateBodyPost(req.body);

    await postService.validateCategoryIds(data.categoryIds);

    const newPost = await postService.create({ id, ...data });

    res.status(201).json(newPost);
  },
};

module.exports = postController;