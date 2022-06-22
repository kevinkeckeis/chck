const userRouter = require('./user');
const categoriesRouter = require('./categorie');
const checklistsRouter = require('./checklist');
const checklistItemsRouter = require('./checklistItem');

const router = require('express').Router();

router.use('/users', userRouter);
router.use('/categories', categoriesRouter);
router.use('/checklists', checklistsRouter);
router.use('/checklistItems', checklistItemsRouter);

module.exports = router;
