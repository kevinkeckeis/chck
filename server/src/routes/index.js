const userRouter = require('./user');
const categoriesRouter = require('./categorie');
const checklistsRouter = require('./checklist');
const checklistItemsRouter = require('./checklistItem');
const LoginRouter = require('./auth');

const router = require('express').Router();

router.use('/users', userRouter);
router.use('/categories', categoriesRouter);
router.use('/checklists', checklistsRouter);
router.use('/checklistItems', checklistItemsRouter);
router.use('/auth', LoginRouter);

module.exports = router;
