const express = require('express');
const router = express.Router();

const {registerController,
loginController} = require("../controller/userController");

router.route('/register').post(registerController);
router.route('/login').post(loginController);

module.exports = router;