const Joi = require('joi');
const models = require('../database/models');
const ConflictError = require('../errors/ConflictError');
const runSchema = require('./utils');

const categoryService = {
  async validateBodyCreate(body) {
    const result = runSchema(Joi.object({
      name: Joi.string().required().min(3).max(255),
    }).messages({
      'string.required': '"name" is required',
      'string.empty': '"name" is required',
    }))(body);

    return result;
  },

  async create(name) {
    const exists = await models.Category.findOne({
      where: name,
      raw: true,
    });

    if (exists) throw new ConflictError('Category already registered');

    const newCategory = (await models.Category.create(name)).toJSON();

    return newCategory;
  },

  async getAll() {
    const allCategories = await models.Category.findAll({
      raw: true,
    });

    return allCategories;
  },
};

module.exports = categoryService;