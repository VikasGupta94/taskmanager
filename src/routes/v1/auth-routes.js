const express = require('express');
const { UserController } = require('../../controllers/index.js');
const userValidator =require('../../validators');
 const {validateBody,authenticate}= require('../../middlewares');
const userController = new UserController();
const routes = express.Router();
routes.post('/register', authenticate, validateBody(userValidator.register), userController.register)
module.exports= routes;
