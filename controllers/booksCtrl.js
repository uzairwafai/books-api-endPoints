const booksRepo = require('../repositories/booksRepo');

const get = async (req, res) => {
    // const books = await booksRepo.get();

    try {
        const pageSize = req.params.size || 3;
        const page = req.params.page || 1;
        const sortBy = req.query.sort || '';
        const sortDir = req.query.directn || '';
        const search = req.query.search || '';

        const rows = await booksRepo.count(search);
        const pages = Math.ceil(rows / pageSize);

        // var p = booksRepo.get(pageSize, page, sortBy, sortDir, search);
        // // console.log(sortBy);
        // p.then(function (data) {   // p is a promise from booksRepo and then takes its resolved value as argument
        //     res.status(200);
        //     const response = {
        //         metadata: {
        //             BookRecordsRetrieved: rows,
        //             pages,
        //         },
        //         data: data,  // the actual resolved value(data) is stored in variable data(can be any name)
        //     };


        //     res.json(response);
        //     // console.log(p);
        // })
        //     .catch(function (err) {   // catch takes the rejected value as an argument
        //         console.log(err.message);
        //         res.status(500);
        //         res.send('Internal Server Error');
        //     });

        const fetchedData = await booksRepo.get(pageSize, page, sortBy, sortDir, search);
        fetchedData.forEach(key => {
            key.image = key.image ? `${req.protocol}://${req.get('host')}/${key.image}` : '';
        })
        const response = {
            metadata: {
                BookRecordsRetrieved: rows,
                pages,
            },
            data: fetchedData,  // the actual resolved value(data) is stored in variable data(can be any name)
        };


        res.json(response);

    }
    catch {
        (function (err) {   // catch takes the rejected value as an argument
            console.log(err.message);
            res.status(500);
            res.send('Internal Server Error');
        });
    };
}

const post = async (req, res) => {
    try {
        req.body.createdDate = new Date();
        req.body.updatedDate = new Date();
        await booksRepo.add(req.body);
        res.status(200);
        res.send('Book data added succesfully');
    }
    catch (err) {
        // console.error(err);
        if (err.message && err.message.indexOf('Book validation failed') > -1) {
            res.status(400);
            res.json(err.errors);
        }
        else {
            res.status(500);
            res.send('Internal Server Error');
        }
    }
};

const remove = async (req, res) => {
    try {
        const id = req.params.id;
        await booksRepo.remove(id);
        res.status(204);
        res.send();
    }
    catch (err) {
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
        //console.log(err);
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
        req.body.updatedDate = Date.now();
        const id = req.params.id;
        const data = req.body;
        await booksRepo.update(id, data);
        res.status(204);
        res.send();
    }
    catch (err) {
        res.status(500);
        res.send('Internal Server Error');
    }
};

const patch = async (req, res) => {
    try {

        req.body.updatedDate = Date.now();
        const id = req.params.id;
        const data = req.body;
        await booksRepo.patch(id, data);
        res.status(200);
        res.send('Updated partially')
    }
    catch (err) {
        console.log(err);
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
    patch,
}