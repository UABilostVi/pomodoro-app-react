const { taskJoiSchema } = require('../models/Tasks');
const {
  saveTask, getAllTasks, updateTask, deleteTask, getTasksById,
} = require('../services/tasksService');

const addUserTask = async (req, res) => {
  const {
    title, description, category, deadLine, priority, estimationTotal,
  } = req.body;
  const { userId } = req.user;

  await taskJoiSchema.validateAsync({
    title, description, category, deadLine, priority, estimationTotal,
  });

  await saveTask({
    title, description, category, deadLine, priority, estimationTotal, userId,
  })
    .then((task) => {
      if (task) {
        res.status(200).json({ message: 'Task created successfully' });
      }
      res.status(400).json({ message: 'Task wasn`t created' });
    });
};

const getUserTasks = async (req, res) => {
  await getAllTasks(req.user.userId)
    .then((tasks) => {
      if (tasks.length === 0) {
        res.status(400).json({ message: 'No tasks found' });
      }
      return res.status(200).json({
        tasks,
      });
    });
};

const getUserTaskById = async (req, res) => {
  await getTasksById(req.params.id, req.user.userId)
    .then((task) => {
      if (!task) {
        res.status(400).json({ message: 'Access denied' });
      }
      res.status(200).json({ task });
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
        res.status(400).json({ message: 'Access denied' });
      }
      res.status(200).json({ task });
    });
};

const deleteUserTaskById = async (req, res) => {
  await deleteTask(req.params.id, req.user.userId)
    .then((task) => {
      if (task) {
        res.status(200).json({ message: 'Task deleted successfully' });
      }
      res.status(400).json({ message: 'Task is undefined' });
    });
};

module.exports = {
  addUserTask,
  getUserTaskById,
  getUserTasks,
  deleteUserTaskById,
  updateUserTaskById,
};
