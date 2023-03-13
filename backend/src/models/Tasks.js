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

  deadLine: Joi.date(),

  estimationTotal: Joi.number(),

  priority: Joi.number()
    .min(0)
    .max(3),

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
  startDate: {
    type: Date || null,
  },
  deadLine: {
    type: Date,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  estimationTotal: {
    type: Number,
  },
  estimationUsed: {
    type: Number,
    default: 0,
  },
  priority: {
    type: Number,
  },
  category: {
    type: String,
  },
  logs: {
    type: Array,
  },

});

const Task = mongoose.model('task', taskSchema);

module.exports = {
  Task,
  taskJoiSchema,
};
