const express = require('express');
const defaultCtrl = require('../controllers/defaultController')
const router = express.Router();


router.get('/', defaultCtrl.home);
router.get('/health',defaultCtrl.health);

module.exports = router;
