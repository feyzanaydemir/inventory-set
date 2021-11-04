const router = require('express').Router();
const authController = require('../controllers/authController');

router.post('/', authController.createToken);
router.delete('/', authController.deleteToken);

module.exports = router;
