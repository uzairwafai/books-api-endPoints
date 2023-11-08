const userRepo = require('../repositories/userRepo');
const jwt = require('jsonwebtoken');
const config = require('../config');


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

const signIn = async (req, res) => {

    try {

        const user = await userRepo.get(req.body);
        if (user) {
            const token = jwt.sign({ email: user.email }, config.jwtSecret, { expiresIn: 15 });
            res.status(201).json({ token_generated: token });
        }
        else
            res.status(401).send('Wrong email or password');
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Internal server error sign in');
    }

};


module.exports = {
    signUp,
    signIn,
}
