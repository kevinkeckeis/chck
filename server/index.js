// Variables
const config = require('./src/config/config');
const PORT = process.env.PORT | 3000;

// Imports
const express = require('express');
const session = require('express-session');
const { sequelize } = require('./src/models');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const passport = require('passport');
const cors = require('cors');

const bodyParser = require('body-parser');
const api = require('./src/routes');
const authRouter = require('./src/routes/auth');

const app = express();

var allowedOrigins = ['http://localhost:3005'];

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          'The CORS policy for this site does not ' +
          'allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

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
