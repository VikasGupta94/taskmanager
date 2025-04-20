const {verifyToken}= require('../utils/jwt');

const  authenticate = (req, res, next) => {

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new Error("No token provided");
    }
    const token = authHeader.split(' ')[1];
    try {
        const user = verifyToken(token);
        req.user = user;
        next()
    }
    catch (error) {
        throw error
    }
} ;
module.exports={authenticate};