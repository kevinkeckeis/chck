const db = require('../models');
const ChecklistItem = db.ChecklistItem;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
  ChecklistItem.findAll({
    include: db.Checklist,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving checklistitems.',
      });
    });
};

exports.create = (req, res) => {
  const { name, ChecklistId } = req.body;

  if (!name || !ChecklistId) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  }

  ChecklistItem.create(req.body)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          'Some error occurred while creating the Checklistitem.',
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  ChecklistItem.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find ${ChecklistItem.name} with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving ${ChecklistItem.name} with id=${id}.`,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  ChecklistItem.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'ChecklistItem was updated successfully.',
        });
      } else {
        res.send({
          message: `Cannot update ChecklistItem with id=${id}. Maybe ChecklistItem was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating ChecklistItem with id=' + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  ChecklistItem.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'ChecklistItem was deleted successfully!',
        });
      } else {
        res.send({
          message: `Cannot delete ChecklistItem with id=${id}. Maybe ChecklistItem was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete ChecklistItem with id=' + id,
      });
    });
};
