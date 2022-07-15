const Joi = require('joi');
const models = require('../database/models');
const ConflictError = require('../errors/ConflictError');
const UserNotFound = require('../errors/UserNotFoundError');
const runSchema = require('./utils');

const userService = {
  async validateBodyCreate(body) {
    const result = runSchema(Joi.object({
      displayName: Joi.string().required().min(8),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6),
      image: Joi.string().required(),
    }).messages({
      'string.min': '{{#label}} length must be at least {{#limit}} characters long',
      'string.email': '{{#label}} must be a valid email',
      'string.required': 'Some required fields are missing',
    }))(body);

    return result;
  },

  async create(data) {
    const { email } = data;

    const exists = await models.User.findOne({
      where: { email },
      raw: true,
    });

    if (exists) throw new ConflictError();

    const newUser = (await models.User.create(data)).toJSON();

    const { password, ...user } = newUser;

    return user;
  },

  async getAll() {
    const allUsers = await models.User.findAll({
      raw: true,
      attributes: {
      exclude: ['password'],
      },
    });

    return allUsers;
  },

  async getByEmail(email, password) {
    const user = await models.User.findOne({ 
      where: { email, password },
      raw: true,
    });

    if (!user) throw new UserNotFound();

    const { password: userPass, ...newUser } = user;

    return newUser;
  },
};

module.exports = userService;