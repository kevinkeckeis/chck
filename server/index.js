// Variables
const config = require('./src/config/config');
const PORT = process.env.PORT | 3000;

// Imports
const express = require('express');
const session = require('express-session');
const { sequelize } = require('./src/models');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const passport = require('passport');

const bodyParser = require('body-parser');
const api = require('./src/routes');
const authRouter = require('./src/routes/auth');

const app = express();

//Sessions
const myStore = new SequelizeStore({
  db: sequelize,
  checkExpirationInterval: 15 * 60 * 1000,
  expiration: 24 * 60 * 60 * 1000,
});

app.use(
  session({
    secret: 'chckworks',
    store: myStore,
    saveUninitialized: true,
    resave: false,
    proxy: false,
  })
);
myStore.sync();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/auth', authRouter);
app.use('/api', passport.authenticate('jwt', { session: false }), api);

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`);
});
