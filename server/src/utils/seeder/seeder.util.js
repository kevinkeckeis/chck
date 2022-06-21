const usersJson = 'src/utils/seeder/users.json';
const categoriesJson = 'src/utils/seeder/categories.json';
const checklistsJson = 'src/utils/seeder/checklists.json';
const checklistItemsJson = 'src/utils/seeder/checklistItems.json';

const db = require('../../../src/models');
const User = db.User;
const Category = db.Category;
const Op = db.Sequelize.Op;

const rw = require('../rwFile.util');
const gen = require('../randomGenerator.util');
const { bulkCreate } = require('./sequelize.util');

const seedModel = async (path, generator, quantity, Model) => {
  let models = await rw.readJsonFileAsObject(path);

  if (models.length == 0) {
    models = await generator(quantity);
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
