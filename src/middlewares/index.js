const { authenticate}  = require("./authenticate");
const {validateBody,validateParams}= require('./validate');
const errorHandler= require('./errorHandler');
module.exports={
    authenticate,
    validateBody,
    validateParams,
    errorHandler
}