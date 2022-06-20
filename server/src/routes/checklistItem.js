const checklistItem = require('../controllers/checklistItem');

const router = require('express').Router();
router.get('/', checklistItem.findAll);
router.post('/', checklistItem.create);
router.get('/:id', checklistItem.findOne);
router.put('/:id', checklistItem.update);
router.delete('/:id', checklistItem.delete);

module.exports = router;
