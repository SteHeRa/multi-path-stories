const express = require('express');

const router = express.Router();

const branchCtrl = require('./controllers/branches');

router.get('/', branchCtrl.getPrompt);
router.post('/', branchCtrl.postBranch);

module.exports = router;
