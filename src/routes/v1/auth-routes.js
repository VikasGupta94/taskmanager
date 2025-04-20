const express = require('express');
const { UserController } = require('../../controllers');
const { userValidator } = require('../../validators');
const { validateBody, authenticate } = require('../../middlewares');
const { UserService } = require('../../services');
const { UserRepository } = require('../../repository');
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);
const routes = express.Router();
routes.post('/register', validateBody(userValidator.register), userController.register.bind(userController))
routes.post('/login', validateBody(userValidator.login), userController.login.bind(userController))
routes.get('/me', authenticate, userController.register.bind(userController))
module.exports = routes;
