const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const PORT = 8080;

const app = express();
const mongoose = require('mongoose');

const { authMiddleware } = require('./middleware/authMiddleware');

const accesLogStream = fs.createWriteStream('access.log', { flags: 'a' });

mongoose.connect('mongodb+srv://BilostVit:MDB136661991@bilostvit.kowgkrt.mongodb.net/pomodoroApp?retryWrites=true&w=majority'); // FIXME

const { usersRouter } = require('./routers/usersRouter');
const { categoriesRouter } = require('./routers/categoriesRouter');
const { tasksRouter } = require('./routers/tasksRouter');

app.use(express.json());
app.use(morgan('combined', { stream: accesLogStream }));

app.use('/api/categories', authMiddleware, categoriesRouter);
app.use('/api/tasks', authMiddleware, tasksRouter);
app.use('/api/users', usersRouter);
// app.use('/api/auth', usersRouter);

app.listen(PORT);

// ERROR HANDLER
function errorHandler(err, req, res) {
  console.error(err.name);
  if (err.name === 'ValidationError' || err.name === 'MongoServerError') {
    return res.status(400).send({ message: err.message });
  }
  return res.status(500).send({ message: err.message });
}

app.use(errorHandler);
