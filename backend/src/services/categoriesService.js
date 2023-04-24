const { Category } = require('../models/Categories');

const saveCategory = async (name, color, userId) => {
  const category = new Category({
    name,
    color,
    createdBy: userId,
    createdDate: new Date().toISOString(),
  });
  return category.save();
};

const getCategories = async (userId) => {
  const categories = await Category.find({ createdBy: userId });
  return categories;
};

const getCategoryById = async (Id, userId) => {
  const category = await Category.findOne({ _id: Id, createdBy: userId });
  return category;
};

const updateCategoryById = async (name, color, categId, userId) => {
  const category = await Category.findOneAndUpdate(
    { _id: categId, createdBy: userId },
    { name, color },
  );
  return category;
};

const delCategory = async (id) => {
  const res = await Category.findByIdAndDelete(id);
  return res;
};

module.exports = {
  saveCategory,
  getCategories,
  getCategoryById,
  updateCategoryById,
  delCategory,
};
