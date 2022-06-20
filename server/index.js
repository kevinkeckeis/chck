// Imports
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const api = require('./src/routes');

// Variables
const PORT = process.env.PORT | 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', api);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`);
});
