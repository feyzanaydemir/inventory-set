const router = require('express').Router();
const itemController = require('../controllers/itemController');
const { checkAuth } = require('../middlewares/authMiddleware');

router.post('/', checkAuth, itemController.createItem);
router.put('/:id', checkAuth, itemController.editItem);
router.delete('/:id', checkAuth, itemController.deleteItem);
router.post('/search', checkAuth, itemController.findItems);
router.get('/filters/:userId', itemController.readItemFilters);
router.get('/recent/:userId', itemController.readRecentItems);

module.exports = router;
