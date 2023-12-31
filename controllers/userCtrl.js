const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userRepo = require('../repositories/userRepo');
const config = require('../config');
const logger = require('../util/logger');


const signUp = async (req, res) => {

    const hasValidationError = (error) => {
        return error.message && error.message.indexOf('users validation failed') > -1;
    };
    const hasDuplicateKeyError = (error) => {
        return error.message && error.message.indexOf('duplicate key error');
    }

    try {
        req.body.createdDate = new Date();
        const body = req.body;               //   const {body}= req; also works the same way
        body.role = 'User'
        body.password = await bcrypt.hash(body.password, 2);   // 2 salt rounds
        await userRepo.add(body);    //  body will be used as payload in add function of repo
        res.status(201).send('User Created');
    }


    catch (err) {
        logger.error(err);
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
            const result = await bcrypt.compare(req.body.password, user.password);
            if (result) {

                const token = jwt.sign({ email: user.email, role: user.role }, config.jwtSecret, { expiresIn: 800 });  /* first param is the data to be added
                 in the token, second param is the seret string which must match during authentication
                 and third is the expiry time of the token after which authentication fails */
                res.status(200).json({ token_generated: token });
            } else {
                res.status(401).send('Unauthorized');
            }
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
