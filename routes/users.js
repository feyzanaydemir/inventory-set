const router = require('express').Router();
const userController = require('../controllers/userController');
const { checkAuth } = require('../middlewares/authMiddleware');

router.post('/', userController.createUser);
// router.get('/guest', userController.getGuest);
router.get('/', checkAuth, (req, res) => {
  res.status(200).json('Valid user');
});

module.exports = router;
