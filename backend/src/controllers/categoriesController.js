const { categoryJoiSchema } = require('../models/Categories');
const {
  saveCategory, getCategories, getCategoryById, updateCategoryById, delCategory,
} = require('../services/categoriesService');

const addUserCategory = async (req, res) => {
  const { name, color } = req.body;
  const { userId } = req.user;
  await categoryJoiSchema.validateAsync({ name, color });
  await saveCategory(name, color, userId)
    .then(() => {
      res.status(200).json({ message: 'Category created successfully' });
    });
};

const getUserCategories = async (req, res) => {
  await getCategories(req.user.userId)
    .then((categories) => {
      if (categories.length === 0) {
        return res.status(400).json({ message: 'No categories found' });
      }
      return res.status(200).json({
        categories,
      });
    });
};

const getUserCategoryById = async (req, res) => {
  await getCategoryById(req.params.id, req.user.userId)
    .then((category) => {
      if (!category) {
        res.status(400).json({ message: 'Access denied' });
      } else {
        res.status(200).json({ category });
      }
    });
};

const updateUserCategoryById = async (req, res) => {
  const { name, color } = req.body;
  const categId = req.params.id;
  const { userId } = req.user;
  await categoryJoiSchema.validateAsync({ name, color });
  await updateCategoryById(name, color, categId, userId)
    .then((result) => {
      if (!result) {
        return res.status(400).json({ message: 'Access denied' });
      }
      return res.status(200).json({ message: 'Category details changed successfully' });
    });
};

const deleteUserCategoryById = async (req, res) => {
  await delCategory(req.params.id)
    .then(() => {
      res.status(200).json({ message: 'Category deleted successfully' });
    });
};

module.exports = {
  addUserCategory,
  getUserCategoryById,
  deleteUserCategoryById,
  getUserCategories,
  updateUserCategoryById,
};
