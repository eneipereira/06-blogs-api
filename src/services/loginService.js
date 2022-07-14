const Joi = require('joi');
const jwt = require('jsonwebtoken');
const runSchema = require('./utils');

const secret = process.env.JWT_SECRET;

const loginService = {
  async validateBodyLogin(body) {
    const result = runSchema(Joi.object({
      email: Joi.string().required().email().max(255),
      password: Joi.string().required().max(255),
    }).messages({
      'any.required': 'Some required fields are missing',
      'string.empty': 'Some required fields are missing',
    }))(body);

    return result;
  },

  async makeToken(user) {
    const { id, displayName, email } = user;

    const payload = { data: { id, displayName, email } };

    const token = jwt.sign(payload, secret);

    return token;
  },
};

module.exports = loginService;