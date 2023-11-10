const express = require('express');
const booksCtrl = require('../controllers/booksCtrl');
const { authorizeAdmin } = require('../middlewares/auth');

router = express.Router();

router.get('/', booksCtrl.get);
router.post('/', booksCtrl.post);
router.get('/page/:page/size/:size', booksCtrl.get);
router.get('/:id', booksCtrl.getById);
router.get('/size/:size', booksCtrl.get);

//adding middleware here so that only admins gets access to the below operations
//router.use(authorizeAdmin);  this works fine but we'll add middleware in the arguments like below
router.delete('/:id', authorizeAdmin, booksCtrl.remove);
router.put('/:id', authorizeAdmin, booksCtrl.update);
router.patch('/:id', authorizeAdmin, booksCtrl.patch);


module.exports = router;