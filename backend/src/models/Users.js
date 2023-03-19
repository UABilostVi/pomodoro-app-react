const mongoose = require('mongoose');
const Joi = require('joi');

const userJoiSchema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(2)
    .max(25)
    .required()
    .messages({ 'string.alphanum': 'Requires the {{#label}} value to only contain a-z, A-Z, 0-9 and no space allowed' }),

  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .min(3)
    .max(30)
    .required()
    .messages({ 'string.pattern.base': 'Password must be minimun 3 and maximum 30 charts long' }),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required()
    .messages({ 'string.email': 'Email must have look like `email@email.com`' }),
});

const User = mongoose.model('User', {
  username: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  createdDate: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
});

module.exports = {
  User,
  userJoiSchema,
};
