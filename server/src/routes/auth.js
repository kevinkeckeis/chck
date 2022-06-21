const router = require('express').Router();

var passport = require('passport');

const db = require('../models');
const User = db.User;
const Op = db.Sequelize.Op;

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
opts.issuer = 'accounts.examplesoft.com';
opts.audience = 'yoursite.net';

passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    User.findByPk({ id: jwt_payload.sub }).then((user) => {
      if (!user) {
        console.log('User not found');
        return cb(null, false, {
          message: 'Incorrect username or password.',
        });
      }
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    });
  })
);

// passport.use(
//   new LocalStrategy(function verify(userId, password, cb) {
//     console.log('local strategy');
//     User.findByPk(userId)
//       .then((user) => {
//         if (!user) {
//           console.log('User not found');
//           return cb(null, false, {
//             message: 'Incorrect username or password.',
//           });
//         }

//         crypto.pbkdf2(
//           password,
//           user.salt,
//           310000,
//           32,
//           'sha256',
//           function (err, hashedPassword) {
//             if (err) {
//               return cb(err);
//             }
//             if (!crypto.timingSafeEqual(user.hashed_password, hashedPassword)) {
//               return cb(null, false, {
//                 message: 'Incorrect username or password.',
//               });
//             }
//             return cb(null, user);
//           }
//         );
//       })
//       .catch((err) => {
//         if (err) {
//           return cb(err);
//         }
//       });
//   })
// );

// router.use('/', (req, res, send) => {
//   res.send('hi');
// });

module.exports = router;
