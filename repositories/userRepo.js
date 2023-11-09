const User = require('../model/user');


const add = function (payload) {
    const user = new User(payload);
    return user.save();
};
const get = (payload) => {
    return User.findOne({ email: payload.email}, { __v: 0});
};


module.exports = {
    add,
    get,
};