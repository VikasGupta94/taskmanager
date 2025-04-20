const Joi = require('joi');
const register = Joi.object({
    username:Joi.string().alphanum().min(3).max(30).required(),
    email:Joi.string().email().required(),
    password:Joi.string().min(6).required()
})
const login= Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().min(6).required()
})
 
module.exports= {
    register,
    login
};