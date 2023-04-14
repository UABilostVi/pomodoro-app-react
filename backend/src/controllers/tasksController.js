const { taskJoiSchema } = require('../models/Tasks');
const {
  saveTask, getAllTasks, updateTask, deleteTask, getTasksById,
} = require('../services/tasksService');

const addUserTask = async (req, res) => {
  const {
    title, description, category, deadline, priority, estimationTotal,
  } = req.body;
  const { userId } = req.user;

  await taskJoiSchema.validateAsync({
    title, description, category, deadline, priority, estimationTotal,
  });

  await saveTask({
    title, description, category, deadline, priority, estimationTotal, userId,
  })
    .then((task) => {
      if (task) {
        return res.status(200).json({ message: 'Task created successfully' });
      }
      return res.status(400).json({ message: 'Task wasn`t created' });
    });
};

const getUserTasks = async (req, res) => {
  await getAllTasks(req.user.userId)
    .then((tasks) => {
      if (tasks.length === 0) {
        return res.status(400).json({ message: 'No tasks found' });
      }
      return res.status(200).json(tasks);
    });
};

const getUserTaskById = async (req, res) => {
  await getTasksById(req.params.id, req.user.userId)
    .then((task) => {
      if (!task) {
        return res.status(400).json({ message: 'Access denied' });
      }
      return res.status(200).json({ task });
    });
};

const updateUserTaskById = async (req, res) => {
  const {
    title, description, category, deadLine, priority, estimationTotal,
  } = req.body;
  const { id } = req.params;
  await taskJoiSchema.validateAsync({
    title, description, category, deadLine, priority, estimationTotal,
  });
  await updateTask({
    title, description, category, deadLine, priority, estimationTotal, id,
  })
    .then((task) => {
      if (!task) {
        return res.status(400).json({ message: 'Access denied' });
      }
      return res.status(200).json({ task });
    });
};

const deleteUserTaskById = async (req, res) => {
  await deleteTask(req.params.id, req.user.userId)
    .then((task) => {
      if (task) {
        return res.status(200).json({ message: 'Task deleted successfully' });
      }
      return res.status(400).json({ message: 'Task is undefined' });
    });
};

module.exports = {
  addUserTask,
  getUserTaskById,
  getUserTasks,
  deleteUserTaskById,
  updateUserTaskById,
};
