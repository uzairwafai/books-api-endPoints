

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



module.exports={
    basicAuth,
}