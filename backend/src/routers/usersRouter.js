const express = require('express');

const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');

const asyncWrapper = (controller) => (req, res, next) => controller(req, res, next).catch(next);

const {
  createProfile,
  login,
  getProfileInfo,
  deleteUser,
  changePass,
} = require('../controllers/usersController');

router.post('/register', asyncWrapper(createProfile));
router.post('/login', asyncWrapper(login));
router.get('/me', authMiddleware, asyncWrapper(getProfileInfo));
router.delete('/me', authMiddleware, asyncWrapper(deleteUser));
router.patch('/me/password', authMiddleware, asyncWrapper(changePass));

module.exports = {
  usersRouter: router,
};
