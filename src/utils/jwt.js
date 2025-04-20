const jwt =require('jsonwebtoken');
const serverConfig =  require("../config/server-config.js");

 const generateToken = (data) => {
    return jwt.sign(data, serverConfig.JWT_SECRET, { expiresIn: '5h' })
}
 const verifyToken = (token) => {
return jwt.verify(token,serverConfig.JWT_SECRET)
}
module.exports={generateToken,verifyToken};
