'use strict'
const { registerAdmin, loginAdmin } = require('../controllers/AdminController');
const express = require('express');
const router = express.Router();

router.post('/registerAdmin', registerAdmin);
router.post('/loginAdmin', loginAdmin);

module.exports = router;