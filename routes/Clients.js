'use strict'

const {registerClient, loginClient} = require('../controllers/ClientsController');
const express = require('express');
const router = express.Router();

router.post('/registerClient', registerClient);
router.post('/loginClient', loginClient);

module.exports = router;