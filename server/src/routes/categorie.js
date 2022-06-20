const category = require('../controllers/category');

const router = require('express').Router();
router.get('/', category.findAll);
router.post('/', category.create);
router.get('/:id', category.findOne);
router.put('/:id', category.update);
router.delete('/:id', category.delete);

module.exports = router;
