require('dotenv').config();
const { userJoiSchema } = require('../models/Users');
const {
  saveUser, savePass, loginUser, getProfile, delProfile, updateSettings,
} = require('../services/usersService');

const createProfile = async (req, res) => {
  const {
    username, password, email,
  } = req.body;

  await userJoiSchema.validateAsync({
    username, password, email,
  });

  await saveUser({
    username, password, email,
  });

  return res.status(200).json({
    message: 'Profile created successfully',
  });
};

const login = async (req, res) => {
  const { password, email } = req.body;

  await userJoiSchema.validateAsync({
    password, email,
  });

  await loginUser(password, email)
    .then((token) => {
      if (token) {
        return res.status(200).json(token);
      }
      return res.status(400).json({ message: 'Wrong email or password' });
    });
};

const getProfileInfo = async (req, res) => {
  await getProfile(req.user.userId)
    .then((user) => {
      if (user) {
        return res.status(200).send(user);
      }
      return res.status(400).json({ message: 'Not found user' });
    });
};

const deleteUser = async (req, res) => {
  await delProfile(req.user.userId)
    .then(() => res.status(200).json({ message: 'Profile deleted successfully' }));
};

const changePass = async (req, res) => {
  const { newPassword, oldPassword } = req.body;
  await savePass(newPassword, oldPassword, req.user.userId)
    .then((user) => {
      if (user) {
        return res.status(200).json({ message: 'Password changed successfully' });
      }
      return res.status(400).json({ message: 'Wrong password' });
    });
};

const changeSettings = async (req, res) => {
  const { settings } = req.body;
  await updateSettings(settings, req.user.userId)
    .then((user) => {
      if (user) {
        return res.status(200).json(user.settings);
      }
      return res.status(400).json({ message: 'Something wrong!' });
    });
};

module.exports = {
  createProfile,
  login,
  getProfileInfo,
  deleteUser,
  changePass,
  changeSettings,
};
