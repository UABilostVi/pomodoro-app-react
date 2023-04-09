const mongoose = require('mongoose');
const Joi = require('joi');

const categoryJoiSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .required(),

  color: Joi.string()
    .required(),
});

const categorieschema = mongoose.Schema({
  name: {
    type: String,
  },
  color: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  createdDate: {
    type: String,
  },
});

const Category = mongoose.model('category', categorieschema);

module.exports = {
  Category,
  categoryJoiSchema,
};
