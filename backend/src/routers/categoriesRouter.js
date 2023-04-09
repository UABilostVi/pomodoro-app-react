const express = require('express');

const asyncWrapper = (controller) => (req, res, next) => controller(req, res, next).catch(next);

const router = express.Router();
const {
  addUserCategory,
  getUserCategoryById,
  deleteUserCategoryById,
  getUserCategories,
  updateUserCategoryById,
} = require('../controllers/categoriesController');

router.post('/', asyncWrapper(addUserCategory));

router.get('/', asyncWrapper(getUserCategories));

router.get('/:id', asyncWrapper(getUserCategoryById));

router.put('/:id', asyncWrapper(updateUserCategoryById));

router.delete('/:id', asyncWrapper(deleteUserCategoryById));

module.exports = {
  categoriesRouter: router,
};
