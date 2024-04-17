const jwt = require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_SECRET

const tokenSign = (user) => {
    const sign = jwt.sign(
        {_id: user._id,
        email: user.email,
        cif: user.cif},
        JWT_SECRET,
        {expiresIn: "960h"} //40 dias
    )
    return sign
}

const verifyToken = (tokenJwt) => {
    try {
        return jwt.verify(tokenJwt, JWT_SECRET)
    }catch(err) {
        console.log(err)
    }
}

module.exports = { tokenSign, verifyToken }
