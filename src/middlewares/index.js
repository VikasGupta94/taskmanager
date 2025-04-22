const { authenticate}  = require("./authenticate");
const {validateBody,validateParams}= require('./validate');
module.exports={
    authenticate,
    validateBody,
    validateParams
}