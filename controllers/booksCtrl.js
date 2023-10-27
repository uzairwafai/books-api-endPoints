const booksRepo = require('../repositories/booksRepo');

const get = (req, res) => {
    // const books = await booksRepo.get();
    const pageSize = req.params.size || 1;
    const page = req.params.page || 10;

    var p = booksRepo.get(pageSize, page);
    p.then(function (data) {   // p is a promise from booksRepo and then takes its resolved value as argument
        res.status(200);
        res.json(data);
        // console.log(p);
    })
        .catch(function (err) {   // catch takes the rejected value as an argument
            res.status(500);
            res.send('Internal Server Error');
        });
};

const post = async (req, res) => {
    try {
        await booksRepo.add(req.body);
        res.status(200);
        res.send('Book data added succesfully');
    }
    catch {
        res.status(500);
        res.send('Internal Server Error');
    }
};

const remove = async (req, res) => {
    try {
        const id = req.params.id;
        await booksRepo.remove(id);
        res.status(204);
        res.send();
    }
    catch {
        res.status(500);
        res.send('Internal Server Error');
    }
};
const getById = async function (req, res) {
    //console.log(req.params);
    try {
        const id = req.params.id;
        const data = await booksRepo.getById(id);
        // console.log('data...', data);
        if (data) {
            res.status(200);
            res.json(data);


        }
        else {
            res.status(404);
            res.send('Not Found as id does not match');
        }

    }
    catch (err) {
        console.log(err);
        if (err.message.indexOf('Cast to ObjectId failed') > -1) {
            res.status(404);
            res.send('Not found as id length does not match.');

        }
        else {
            res.status(500);
            res.send('Internal Server Error');

        }
    }
};

const update = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        await booksRepo.update(id, data);
        res.status(200);
        res.send();
    }
    catch {
        res.status(500);
        res.send('Internal Server Error');
    }
};





module.exports = {
    get,
    post,
    remove,
    getById,
    update,
}