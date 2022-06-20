const checklist = require('../controllers/checklist');

const router = require('express').Router();
router.get('/', checklist.findAll);
router.get('/public', checklist.findAllPublic);
router.post('/', checklist.create);
router.get('/:id', checklist.findOne);
router.put('/:id', checklist.update);
router.delete('/:id', checklist.delete);

module.exports = router;
