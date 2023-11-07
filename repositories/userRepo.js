const User = require('../model/user');


const add = function (payload) {
    const user = new User(payload);
    return user.save();
};



module.exports={
    add,
};