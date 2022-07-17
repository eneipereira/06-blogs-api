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

  /** @type {import('express').RequestHandler} */
  async getAll(req, res) {
    const token = req.headers.authorization;
    
    await loginService.readToken(token);
    
    const allPosts = await postService.getAll();
    
    res.status(200).json(allPosts);
  },
  
  /** @type {import('express').RequestHandler} */
  async getById(req, res) {
    const token = req.headers.authorization;

    const { id } = await postService.validateParamsId(req.params);

    await loginService.readToken(token);

    const post = await postService.getById(id);

    res.status(200).json(post);
  },
};

module.exports = postController;