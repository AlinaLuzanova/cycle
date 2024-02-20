require('@babel/register');
require('dotenv').config();

const express = require('express');
const serverConfig = require('./config/serverConfig');

const indexRouter = require('./routes/index.routes');
const routesRouter = require('./routes/api/routes.routes');
const saveRouter = require('./routes/api/save.routes');

const { sequelize } = require('./db/models');

const app = express();
const PORT = process.env.PORT ?? 3000;
serverConfig(app);


app.use('/', indexRouter);
app.use('/routes', routesRouter);
app.use('/save', saveRouter);

sequelize.authenticate();

app.listen(PORT, () => {
  console.log(`*** Server started at ${PORT} port ***`);
});
