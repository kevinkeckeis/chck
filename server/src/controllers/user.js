const db = require('../models');
const User = db.User;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
  User.findAll({
    include: [db.Category, db.Checklist],
    // attributes: { exclude: ['createdAt',] }
  })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || 'Some error occurred while retrieving users.',
      });
    });
};

exports.create = (req, res) => {
  const user = ({
    username,
    email,
    password,
    firstName = '',
    lastName = '',
  } = req.body);

  if (!username || !email || !password) {
    res.status(400).json({
      message: 'Content can not be empty!',
    });
    return;
  }

  User.create(user)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || 'Some error occurred while creating the User.',
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  User.findByPk(id, {
    include: [db.Category, db.Checklist],
    // attributes: { exclude: ['createdAt',] }
  })
    .then((data) => {
      if (data) {
        res.json(data);
      } else {
        res.status(404).json({
          message: `Cannot find ${User.name} with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: `Error retrieving ${User.name} with id=${id}.`,
      });
    });
};

exports.update = (req, res) => {
  // TODO: Avoid consumer from changing userRole, but allow admin with the same request
  const id = req.params.id;
  const { username, email, password, userRole, firstName, lastName } = req.body;
  const user = { username, email, userRole, password, firstName, lastName };

  User.update(user, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.json({
          message: 'User was updated successfully.',
        });
      } else {
        res.json({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Error updating User with id=' + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  User.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.json({
          message: 'User was deleted successfully!',
        });
      } else {
        res.json({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Could not delete User with id=' + id,
      });
    });
};
