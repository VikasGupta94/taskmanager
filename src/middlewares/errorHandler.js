const { StatusCodes, getReasonPhrase } = require('http-status-codes');
const { errorResponse } = require('../utils/response.js');
const serverConfig = require('../config/server-config.js');
const isDev = serverConfig.NODE_ENV === 'development';

const errorHandler = (err, req, res, next) => {
    console.error(`ERROR : ${err}`);

    let statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    let message = err.message || getReasonPhrase(statusCode);

    // Handle known error types
    if (err.name === 'ValidationError') {
        statusCode = StatusCodes.BAD_REQUEST;
        message = err.message;
    }
    if (err.name === 'SequelizeUniqueConstraintError') {
          statusCode=StatusCodes.CONFLICT
          message= err.errors[0]?.message || 'Unique constraint error'
      }

    // Customize the error payload
    const errorPayload = isDev
        ? { stack: err.stack }
        : {};

    return errorResponse(res, message, errorPayload, statusCode);
};
module.exports = errorHandler;