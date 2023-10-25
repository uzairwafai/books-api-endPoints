const express = require('express');
const booksCtrl = require('../controllers/booksCtrl');

router = express.Router();

router.get('/', booksCtrl.get);
router.post('/',booksCtrl.post);


module.exports = router;