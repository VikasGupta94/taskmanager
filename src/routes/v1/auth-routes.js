import express from 'express';
import { UserController } from '../../controllers/index.js';
import { validateBody } from '../../middlewares/validate.js';
import { userValidator } from '../../validators/index.js';
import { authenticate } from '../../middlewares/authenticate.js';

const userController = new UserController();
const routes = express.Router();
routes.post('/register', authenticate, validateBody(userValidator.register), userController.register)
export default routes;
