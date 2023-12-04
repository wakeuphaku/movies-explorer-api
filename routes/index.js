const express = require('express');
const { celebrate, Joi } = require('celebrate');
const { auth } = require('../middlewares/auth');
const { createUsers, login, logout } = require('../controlers/users');
const NotFoundError = require('../errors/NotFoundError');

const router = express.Router();

const userRouter = require('./user');
const movieRouter = require('./movie');

router.post('/signup', createUsers, celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().min(2).max(30),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(2),
    }),
}));

router.post('/signin', login, celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
}));

router.post('/signout', logout);

router.use(auth);
router.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

router.use('/', userRouter);

router.use('/', movieRouter);

module.exports = router;
