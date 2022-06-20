const usersJson = 'src/seeders/users.seeds.json';
const categoriesJson = 'src/seeders/categories.seeds.json';
const checklistsJson = 'src/seeders/checklists.json';
const checklistItemsJson = 'src/seeders/checklistItems.json';

const db = require('../models');
const User = db.User;
const Category = db.Category;
const Op = db.Sequelize.Op;

const rw = require('./rwFile.util');
const gen = require('./randomGenerator.util');
const { bulkCreate } = require('./sequelize.util');

const seedModel = async (path, generator, quantity, Model) => {
  let models = await rw.readJsonFileAsObject(path);

  if (models.length == 0) {
    models = generator(quantity);
    rw.saveObjectAsJsonFile(path, models);
  }
  bulkCreate(db, Model, models);
  console.log(Model.name, 'seeded.');
  return models;
};

const seedServer = async () => {
  let users = await seedModel(usersJson, gen.generateUsers, 5, User);
  let categories = await seedModel(
    categoriesJson,
    gen.generateCategories(users),
    3,
    Category
  );
};

module.exports = { seedServer };
