const db = require('../models');
const Checklist = db.Checklist;
const Category = db.Category;
const ChecklistItem = db.ChecklistItem;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
  Checklist.findAll({
    where: { UserId: req.user.id },
    include: [Category, ChecklistItem],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving checklists.',
      });
    });
};
exports.findAllPublic = (req, res) => {
  Checklist.findAll({ where: { isPublic: true }, include: Category })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving checklists.',
      });
    });
};

exports.create = (req, res) => {
  const checklist = req.body;
  checklist.UserId = req.user.id;
  Checklist.create(checklist)
    .then((data) => {
      if (checklist.Categories) {
        const categorieIds = checklist.Categories.map(
          (category) => category.id
        );
      data.addCategories(categorieIds);
      }
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Checklist.',
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Checklist.findByPk(id, { include: [Category, ChecklistItem] })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find ${Checklist.name} with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving ${Checklist.name} with id=${id}.`,
      });
    });
};

// TODO: Remove removed Categories on update
// TODO: Add new Categories on update
// TODO: Update Categories on update

exports.update = (req, res) => {
  const id = req.params.id;

  const { Categories: categories } = req.body;
  Checklist.update(req.body, {
    where: { id: id },
  })
    .then(async (num) => {
      if (num == 1) {
        const checklist = await Checklist.findByPk(id, { include: Category });
        // checklist.removeCategories('80f3aa44-0f18-4420-9975-046edf71bee2');
        categories.forEach((category) => {
          Category.update(category, { where: { id: category.id } });
        });

        res.send({
          message: 'Checklist was updated successfully.',
        });
      } else {
        res.send({
          message: `Cannot update Checklist with id=${id}. Maybe Checklist was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Checklist with id=' + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Checklist.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Checklist was deleted successfully!',
        });
      } else {
        res.send({
          message: `Cannot delete Checklist with id=${id}. Maybe Checklist was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Checklist with id=' + id,
      });
    });
};
