import express from 'express';
import authRoues from './auth-routes.js';
const routes= express.Router();
routes.use('/auth',authRoues);
export default routes;
