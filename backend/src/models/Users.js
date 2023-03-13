const mongoose = require('mongoose');
const Joi = require('joi');

const userJoiSchema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(2)
    .max(25),

  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .required(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
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
