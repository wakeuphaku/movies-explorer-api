const express = require('express');
const { celebrate, Joi } = require('celebrate');
const { getCurrentUser, patchUsers } = require('../controlers/users');

const router = express.Router();

router.get('/users/me', getCurrentUser);
router.patch('/users/me', patchUsers, celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
  }),
}));

module.exports = router;
