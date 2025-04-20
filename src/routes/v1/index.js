const express = require('express');
const authRoutes= require('./auth-routes');
const taskRoutes= require('./task-routes');
const routes= express.Router();
routes.use('/auth',authRoutes);
routes.use('/task',taskRoutes)
module.exports = routes;
