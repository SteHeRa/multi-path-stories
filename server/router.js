const express = require('express');

const router = express.Router();

const testCtrl = require('./controllers/pugtest');

router.get('/', testCtrl.makeHTML);

module.exports = router;
