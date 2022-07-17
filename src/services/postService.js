const Joi = require('joi');
const Sequelize = require('sequelize');
const models = require('../database/models');
const config = require('../database/config/config');
const BadRequestError = require('../errors/BadRequestError');
const runSchema = require('./utils');
const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');

/** @type {import('sequelize').Sequelize} */
const sequelize = new Sequelize(config.development);

const postService = {
  async validateBodyPostAdd(body) {
    const result = runSchema(Joi.object({
      title: Joi.string().required().max(255),
      content: Joi.string().required().max(255),
      categoryIds: Joi.array().min(1).required(),
    }).messages({
      'any.required': 'Some required fields are missing',
      'string.empty': 'Some required fields are missing',
    }))(body);

    return result;
  },

  async validateBodyPostEdit(body) {
    const result = runSchema(Joi.object({
      title: Joi.string().required().max(255),
      content: Joi.string().required().max(255),
    }).messages({
      'any.required': 'Some required fields are missing',
      'string.empty': 'Some required fields are missing',
    }))(body);

    return result;
  },

  async validateCategoryIds(categoryIds) {
    const data = await Promise.all(
      categoryIds.map((id) => models.Category.findOne({ where: id, raw: true })),
    );

    const exists = data.every((each) => each);

    if (!exists) throw new BadRequestError('"categoryIds" not found');
  },

  async validateParamsId(params) {
    const result = runSchema(Joi.object({
      id: Joi.number().required().positive().integer(),
    }))(params);

    return result;
  },

  async create(data) {
    const { id, title, content, categoryIds } = data;

    const result = await sequelize.transaction(async (t) => {
      const newPost = (await models.BlogPost.create(
        { title, content, userId: id },
        { transaction: t, raw: true },
      )).toJSON();

      const PostCategories = categoryIds.map((categoryId) => ({
        postId: newPost.id, categoryId,
      }));

      await models.PostCategory.bulkCreate(PostCategories, { transaction: t });

      return newPost;
    });

    return result;
  },

  async getAll() {
    const allPosts = await models.BlogPost.findAll({
      include: [
        { model: models.User, as: 'user', attributes: { exclude: ['password'] } },
        { model: models.Category, as: 'categories', through: { attributes: [] } },
      ],
    });

    return allPosts;
  },

  async getById(id) {
    const post = await models.BlogPost.findOne({
      where: { id },
      include: [
        { model: models.User, as: 'user', attributes: { exclude: ['password'] } },
        { model: models.Category, as: 'categories', through: { attributes: [] } },
      ],
    });

    if (!post) throw new NotFoundError('Post does not exist');

    return post;
  },

  async edit(userId, id, changes) {
    const oldPost = await postService.getById(id);
    
    if (userId !== id) throw new UnauthorizedError();
    
    const postChanges = { ...oldPost, ...changes, updated: new Date() };
    
    await models.BlogPost.update(postChanges, { where: { id } });
  },
  
  async remove(userId, id) {
    const post = await postService.getById(id);

    if (userId !== post.userId) throw new UnauthorizedError();

    await models.BlogPost.destroy({ where: { id } });
  },
};

module.exports = postService;