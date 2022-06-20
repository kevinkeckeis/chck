const { sequelize, Sequelize } = require('./src/models');
const db = require('./src/models');
const Op = db.Sequelize.Op;
const { seedServer } = require('./src/utils/seeder.util');

// sequelize
//   .authenticate()
//   .then(console.log('Connection has been established successfully.'))
//   .catch((err) => console.error('Unable to connect to the database:', err));

sequelize
  .sync({ force: true, alter: true, logging: false })
  .then(() => {
    console.log('All models were synchronized successfully.');
  })
  .then(() => {
    seedServer();
  });
// db.User.findAll({
//   where: { username: 'lesterpeeters' },
//   include: db.Category,
// }).then((data) => {
//   console.log(data);
// });
