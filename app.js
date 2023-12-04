const express = require('express');

const { errors } = require('celebrate');

const { PORT = 3000 } = process.env;

const mongoose = require('mongoose');

const cors = require('cors');

const { requestLoggs, errorLoggs } = require('./middlewares/loggs');

const NotFoundError = require('./errors/NotFoundError');

const corsUrl = [
  'http://localhost:3001',
  'https://localhost:3001',
  'http://diplom.haku.nomoredomainsmonster.ru',
  'https://diplom.haku.nomoredomainsmonster.ru',
];

mongoose.connect('mongodb://localhost:27017/diplomdb', {
  useNewUrlParser: true,
  autoIndex: true,
});

const router = require('./routes');

const app = express();

app.use(express.json());

app.use(cors({ credentials: true, origin: corsUrl }));

app.use(requestLoggs);

app.use(router);

app.use((req, res, next) => {
  next(new NotFoundError('Что то не так'));
});

app.use(errors());

app.use(errorLoggs);

app.use((err, req, res, next) => {
  const {
    statusCode = 500,
    message,
  } = err;
  res.status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

app.listen(PORT);
