const jwt = require('jsonwebtoken');
const moment = require('moment');

const signToken = async (user) =>{
    let payload = {
        sub: user._id,
        email: user.email,
        iat: moment().unix(),
        exp: moment().add(7,'days').unix()
    }
    return await jwt.sign(payload, process.env.JWT_SECRET);
}

module.exports = signToken;