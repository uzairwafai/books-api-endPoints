const express = require('express');
const booksCtrl = require('../controllers/booksCtrl');
const { authorizeAdmin } = require('../middlewares/auth');
const multer = require('multer');

//const upload = multer({ dest: 'uploads/' });


const storage = multer.diskStorage({
    destination: function (req, file, cb) {  // the destination fuction takes parameter as request object and file and a call back func which will be called by multer
        cb(null, 'uploads')        // the call back fn takeserror as 1st param and  the destinaltion folder as parameter and is called by myulter to set it so    
    },
    filename: function (req, file, cb) {
        const random = Math.round(Math.random() * 1E9);  // to make complete unique name as two same name files can be uploaded at the same time
        const dt = Date.now();  // to make file name unique as filesystem cant allow same file names
        const fileName = `${random}-${dt}-${file.originalname}`;
        req.body.image = fileName;  // saving string value in the req obj so that it can be saved in the db
        cb(null, fileName);
    }
});

const upload = multer({ storage });

router = express.Router();

router.get('/', booksCtrl.get);
router.post('/', upload.single('image'), booksCtrl.post);
router.get('/page/:page/size/:size', booksCtrl.get);
router.get('/:id', booksCtrl.getById);
router.get('/size/:size', booksCtrl.get);

//adding middleware here so that only admins gets access to the below operations
//router.use(authorizeAdmin);  this works fine but we'll add middleware in the arguments like below
router.delete('/:id', authorizeAdmin, booksCtrl.remove);
router.put('/:id', authorizeAdmin, booksCtrl.update);
router.patch('/:id', authorizeAdmin, booksCtrl.patch);


module.exports = router;