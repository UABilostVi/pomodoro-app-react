const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/Users');

const saveUser = async ({
  username, password, email,
}) => {
  const user = new User({
    username,
    email,
    password: bcrypt.hashSync(password, 10),
    createdDate: new Date().toISOString(),
  });
  return user.save();
};

const loginUser = async (password, email) => {
  const user = await User.findOne({ email });
  if (user && await bcrypt.compare(String(password), String(user.password))) {
    const payload = { username: user.username, userId: user.id };
    const jwtToken = jwt.sign(payload, process.env.SECURE_PASS);
    return jwtToken;
  } return false;
};

const getProfile = async (id) => {
  const user = await User.findById({ _id: id });
  return user;
};

const delProfile = async (id) => {
  await User.findByIdAndDelete({ _id: id });
};

const savePass = async (newPassword, oldPassword, userId) => {
  const user = await User.findById({ _id: userId });
  if (user && await bcrypt.compare(String(oldPassword), String(user.password))) {
    user.password = await bcrypt.hash(newPassword, 10);
    return user.save();
  } return false;
};

module.exports = {
  saveUser,
  savePass,
  loginUser,
  getProfile,
  delProfile,
};
