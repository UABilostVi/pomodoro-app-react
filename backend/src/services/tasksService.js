const { Task } = require('../models/Tasks');

const saveTask = async ({
  title, description, category, deadline, priority, estimationTotal, userId,
}) => {
  const task = new Task({
    title,
    description,
    category,
    deadline: new Date(deadline),
    priority,
    estimationTotal,
    createdBy: userId,
    createdDate: new Date(),
  });
  return task.save();
};

const getAllTasks = async (userId) => {
  const tasks = await Task.find({ createdBy: userId });
  return tasks;
};

const getTasksById = async (taskId, userId) => {
  const task = await Task.findOne({ _id: taskId, createdBy: userId });
  return task;
};

const updateTask = async ({
  title, description, category, deadline, priority, estimationTotal, id,
}) => {
  const task = await Task.findOneAndUpdate(
    { _id: id },
    {
      title, description, category, deadline, priority, estimationTotal,
    },
    { new: true },
  );
  return task;
};

const deleteTask = async (taskId, userId) => {
  const task = await Task.findOneAndDelete({ _id: taskId, createdBy: userId });
  return task;
};

module.exports = {
  saveTask,
  updateTask,
  deleteTask,
  getAllTasks,
  getTasksById,
};
