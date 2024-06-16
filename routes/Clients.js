'use strict'

const {registerClient} = require('../controllers/ClientsController');
const express = require('express');
const router = express.Router();

router.get('/registerClient', registerClient);

module.exports = router;