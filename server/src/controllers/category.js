const db = require('../models');
const Category = db.Category;
const Checklist = db.Checklist;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
  Category.findAll({ attributes: { exclude: ['createdAt'] } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving categories.',
      });
    });
};

exports.create = (req, res) => {
  const { name, isFavorite, UserId } = req.body;

  if (!name || !UserId) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  }

  const category = {
    name,
    isFavorite,
    UserId,
  };

  Category.create(category)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Category.',
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Category.findByPk(id, { include: Checklist })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find ${Category.name} with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving ${Category.name} with id=${id}.`,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  const { name, isFavorite, UserId } = req.body;
  const category = { name, isFavorite, UserId };

  Category.update(category, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Category was updated successfully.',
        });
      } else {
        res.send({
          message: `Cannot update Category with id=${id}. Maybe Category was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Category with id=' + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Category.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Category was deleted successfully!',
        });
      } else {
        res.send({
          message: `Cannot delete Category with id=${id}. Maybe Category was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Category with id=' + id,
      });
    });
};
