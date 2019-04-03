const express = require('express');

const router = express.Router();

const UsersController = require('../controller/users');

router.get('/all', UsersController.get_all_users);

router.get('/add/:id', UsersController.add_user);

module.exports = router;
