const Joi = require('joi');
const Sequelize = require('sequelize');
const models = require('../database/models');
const config = require('../database/config/config');
const BadRequestError = require('../errors/BadRequestError');
const runSchema = require('./utils');

/** @type {import('sequelize').Sequelize} */
const sequelize = new Sequelize(config.development);

const postService = {
  async validateBodyPost(body) {
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

  async validateCategoryIds(categoryIds) {
    const data = await Promise.all(
      categoryIds.map((id) => models.Category.findOne({ where: id, raw: true })),
    );

    const exists = data.every((each) => each);

    if (!exists) throw new BadRequestError('"categoryIds" not found');
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
};

module.exports = postService;