const express = require('express');
const { authMiddleware } = require('../middleware/authMiddleware');

const asyncWrapper = (controller) => (req, res, next) => controller(req, res, next).catch(next);

const router = express.Router();
const {
  addUserCategory,
  getUserCategoryById,
  deleteUserCategoryById,
  getUserCategories,
  updateUserCategoryById,
} = require('../controllers/categoriesController');

router.post('/', authMiddleware, asyncWrapper(addUserCategory));

router.get('/', authMiddleware, asyncWrapper(getUserCategories));

router.get('/:id', asyncWrapper(getUserCategoryById));

router.patch('/:id', asyncWrapper(updateUserCategoryById));

router.delete('/:id', asyncWrapper(deleteUserCategoryById));

module.exports = {
  categoriesRouter: router,
};
