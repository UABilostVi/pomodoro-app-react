const mongoose = require('mongoose');
const Joi = require('joi');

const taskJoiSchema = Joi.object({

  title: Joi.string()
    .min(3)
    .max(30)
    .required(),

  description: Joi.string()
    .min(3)
    .max(30),

  category: Joi.string(),

  createdDate: Joi.date(),

  deadline: Joi.date(),

  estimationTotal: Joi.number()
    .min(1)
    .max(5),

  priority: Joi.string()
    .valid('urgent', 'high', 'middle', 'low'),

  createdBy: Joi.string(),

});

const taskSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  createdDate: {
    type: Date,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  deadline: {
    type: Date,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  estimationTotal: {
    type: Number,
  },
  estimationUsed: {
    type: Number,
    default: 0,
  },
  priority: {
    type: String,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
  },

});

const Task = mongoose.model('task', taskSchema);

module.exports = {
  Task,
  taskJoiSchema,
};
