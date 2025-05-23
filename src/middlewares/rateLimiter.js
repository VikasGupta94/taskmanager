const rateLimit = require('express-rate-limit');
const { StatusCodes } = require('http-status-codes');

 const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true, 
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests, please try again later.',
  },
  statusCode: StatusCodes.TOO_MANY_REQUESTS
});
module.exports=generalLimiter;