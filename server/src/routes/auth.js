const router = require('express').Router();

var passport = require('passport');

const db = require('../models');
const User = db.User;
const Op = db.Sequelize.Op;

const LocalStrategy = require('passport-local').Strategy;

const jwt = require('jsonwebtoken');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

// login strategy
passport.use(
  'login',
  new LocalStrategy(function verify(username, password, done) {
    User.findOne({
      where: { username },
    })
      .then(async (user) => {
        if (!user) {
          return done(null, false, {
            message: 'Incorrect username or password.',
          });
        }
        user.isValidPassword(password, function (err, isValid) {
          if (err) {
            return done(err);
          }
          if (isValid) {
            return done(null, user);
          } else {
            return done(null, false, {
              message: 'Invalid password',
            });
          }
        });
      })
      .catch((err) => done(err));
  })
);

// signup strategy
passport.use(
  'signup',
  new LocalStrategy(
    {
      passReqToCallback: true,
      session: false,
    },
    async (req, username, password, done) => {
      try {
        const userbody = ({
          username,
          email,
          password,
          firstName = '',
          lastName = '',
        } = req.body);
        const user = await User.create(userbody);
        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

// jwt strategy
passport.use(
  new JWTstrategy(
    {
      secretOrKey: 'TOP_SECRET',
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);

// Sign Up Route
router.post(
  '/signup',
  passport.authenticate('signup', { session: false }),
  async (req, res, next) => {
    res.json({
      message: 'Signup successful',
      user: req.user,
    });
  }
);

// Login Route
router.post('/login', async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error('An error occurred.');
        return next(error);
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);
        const body = {
          _id: user._id,
          username: user.username,
          email: user.email,
        };
        const token = jwt.sign({ user: body }, 'TOP_SECRET');

        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});
module.exports = router;
