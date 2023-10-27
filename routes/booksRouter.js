const express = require('express');
const booksCtrl = require('../controllers/booksCtrl');

router = express.Router();

router.get('/', booksCtrl.get);
router.post('/', booksCtrl.post);
router.delete('/:id', booksCtrl.remove);
router.get('/:id', booksCtrl.getById);
router.get('/page/:page/size/:size', booksCtrl.get);


module.exports = router;