const express = require('express');
const bodyParser = require('body-parser');
const serverConfig = require('./config/server-config');
const apiRoutes = require('./routes');
const cors = require('cors');
const morgan = require('morgan');
const logger = require('./config/logger.js');
const { errorHandler, generalLimiter } = require('./middlewares');
const { StatusCodes } = require('http-status-codes');
const AppError = require('./utils/appError.js');
const app = express();
function startServer() {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    const corsOptions = {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: false,
    };
    app.use(cors(corsOptions));
    morgan.token('user-agent', (req) => req.headers['user-agent']);
    app.use(morgan('incoming  :user-agent :method :remote-addr :url ', { stream: { write: (message) => logger.info(message.trim()) }, immediate: true }))
    app.use(morgan('outgoing  :user-agent :method :remote-addr :url :status :res[content-length] - :response-time ms', { stream: { write: (message) => logger.info(message.trim()) } }));
    app.use(generalLimiter)
    app.use('/api', apiRoutes)
    app.use((req, res, next) => {
        throw new AppError("Route not found", StatusCodes.NOT_FOUND)
    });
    app.use(errorHandler);

    app.listen(serverConfig.SERVER_PORT, () => {
        console.log(`server listening on port : ${serverConfig.SERVER_PORT}`)
    })
};
startServer();