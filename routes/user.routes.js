const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { validateCreateUser, validateUpdateUser } = require('../validators/user.validator');

router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.post('/', validateCreateUser, userController.createUser);
router.put('/:id', validateUpdateUser, userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;