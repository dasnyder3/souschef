const express = require('express');
const path = require('path');
const app = express();

// require routers
const recipesRouter = require('./routes/recipes');

// handle parsing request body
app.use(express.json());

app.use('/build', express.static(path.join(__dirname, '../build')));

app.use('/recipes', recipesRouter);

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.log);
  res.status(errorObj.status).send(errorObj.message);
});

app.listen(3000); 