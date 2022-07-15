const express = require('express');
require('express-async-errors');
const categoryRoute = require('./routes/categoryRoute');
const loginRoute = require('./routes/loginRoute');
const userRoute = require('./routes/userRoute');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());

app.use('/categories', categoryRoute);
app.use('/login', loginRoute);
app.use('/user', userRoute);

app.use(errorHandler);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
