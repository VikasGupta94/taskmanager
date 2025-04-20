const express = require('express');
const authRoues= require('./auth-routes');
const routes= express.Router();
routes.use('/auth',authRoues);
module.exports = routes;
