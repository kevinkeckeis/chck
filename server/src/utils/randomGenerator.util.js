const { v4: uuidv4 } = require('uuid');
const Chance = require('chance');
const chance = new Chance();
const bcrypt = require('bcrypt');

const generateUsers = async (quantity = 25) => {
  const now = new Date().toISOString();
  let users = [];
  for (let i = 0; i < quantity; i++) {
    const firstName = chance.first();
    const lastName = chance.last();

    const user = {
      id: uuidv4(),
      username: `${firstName.toLowerCase()}${lastName.toLowerCase()}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${chance.domain()}`,
      password: await bcrypt.hash('password', 10),
      firstName,
      lastName,
      createdAt: now,
      updatedAt: now,
    };
    users.push(user);
  }
  return users;
};

const generateCategories =
  (users) =>
  (quantity = 5) => {
    const now = new Date().toISOString();
    let categories = [];
    users.forEach((user) => {
      for (let i = 0; i < quantity; i++) {
        const categorie = {
          id: uuidv4(),
          name: `${chance.word()}`,
          UserId: user.id,
          createdAt: now,
          updatedAt: now,
        };
        categories.push(categorie);
      }
    });
    return categories;
  };

module.exports = { generateUsers, generateCategories };
