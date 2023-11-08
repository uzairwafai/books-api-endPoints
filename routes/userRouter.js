const express = require('express');
const userCtrl = require('../controllers/userCtrl');
const router = express.Router();

router.post('/signup', userCtrl.signUp);
router.post('/signin',userCtrl.signIn);



module.exports = router;