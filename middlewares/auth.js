const jwt = require('jsonwebtoken');
const config = require('../config');  //   config/index is implicitly called

function basicAuth(req, res, next) {        // middleware
    const headers = req.headers;
    const authHeader = headers.authorization;  // Basic dxN1cfjksdfkllkdjfjkl(space bw basic and credentials)
    if (!authHeader) {
        res.status(401);
        res.send('You need to authenticate first');
    } else {
        const token = authHeader.split(" ");  // splits on basis of " "(space) and puts into an array
        const base64Str = token[1]              // gives second element of authHeadr
        // now we need to convert the base64 str into the real data
        const buf = Buffer.from(base64Str, 'base64');
        const decodedStr = buf.toString();  // as buf will be in binary
        /*console.log(decodedStr);
        will be like username:password
        we need to seperate them*/
        const username = decodedStr.split(':')[0];  // saved two lines of code // first elem of aray
        const password = decodedStr.split(':')[1];

        if (username === 'user1@gmail.com' && password === 'password')
            next();
        else
            res.status(401).send('Invalid credentials');
    }

};

const tokenAuth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            res.status(401).send('auth header not sent');
        } else {
            const tokens = authHeader.split(' ');  // token generated in signin is like Bearer jhfkjdshkAgdhg3j=/.sdgf
            const jwtToken = tokens[1];

            const decodedToken = jwt.verify(jwtToken, config.jwtSecret);
            // console.log(decodedToken);
            // console.log(req);
            req.role = decodedToken.role;   /* as token object contains email and role so we add role property to req object
             so that we can use it. role property was not present in req obj till now, we do it because re q obj has access to all middlewares and handlers
             and this decodedToken obj is only available in this function and will not be available in the next middleware whre role property
             is required*/
            next();
        }
    } catch (err) {
        // console.error(err);
        res.status(401).send('Token auth Failed');
    }
};


const authorizeAdmin = (req, res, next) => {
    const role = req.role;
    console.log(role);
    if (role === 'admin') next();
    else res.status(403).send('Forbidden');

};


module.exports = {
    basicAuth,
    tokenAuth,
    authorizeAdmin,
}