const userRepo = require('../repositories/userRepo');


const signUp = async (req, res) => {

    const hasValidationError = (error) => {
        return error.message && error.message.indexOf('users validation failed') > -1;
    };
    const hasDuplicateKeyError = (error) => {
        return error.message && error.message.indexOf('duplicate key error');
    }

    try {
        req.body.createdDate = new Date();
        const body = req.body;
        await userRepo.add(body);    //  body will be used as payload in add function of repo
        res.status(201).send('User Created');
    }


    catch (err) {
        if (hasValidationError(err)) {
            res.status(400);
            res.json(err.errors);
        }
        else if (hasDuplicateKeyError(err)) {
            res.status(409).send(err.message);
        }
        else {

            console.error(err);
            res.status(500).json(err.message);
        }
    }
};




module.exports = {
    signUp,
}
