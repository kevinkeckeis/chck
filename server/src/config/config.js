const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  database: process.env.DATABASE,
  username: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  port: process.env.DB,
  host: process.env.DBHOST,
  dialect: process.env.DIALECT,
};
