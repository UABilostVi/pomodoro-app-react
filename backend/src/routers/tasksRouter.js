const express = require('express');
const { authMiddleware } = require('../middleware/authMiddleware');
const {
  addUserTask,
  getUserTaskById,
  getUserTasks,
  deleteUserTaskById,
  updateUserTaskById,
} = require('../controllers/tasksController');

const asyncWrapper = (controller) => (req, res, next) => controller(req, res, next).catch(next);
const router = express.Router();

router.post('/', authMiddleware, asyncWrapper(addUserTask));

router.get('/', authMiddleware, asyncWrapper(getUserTasks));

router.get('/:id', authMiddleware, asyncWrapper(getUserTaskById));

router.patch('/:id', authMiddleware, asyncWrapper(updateUserTaskById));

router.delete('/:id', authMiddleware, asyncWrapper(deleteUserTaskById));

module.exports = {
  tasksRouter: router,
};
