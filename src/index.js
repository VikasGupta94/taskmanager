import express from 'express';
import bodyParser from 'body-parser';
import  serverConfig  from './config/server-config.js';
import apiRoutes from './routes/index.js'
import cors from 'cors';
import morgan from 'morgan';
import { logger } from './config/logger.js';
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
    app.use('/api', apiRoutes)
    app.use((err, req, res, next) => {
        if (err) {
            if (err.name == 'ValidationError') {
                res.status(400).json({
                    is_error: true,
                    error_message: err.message,
                    data: {}
                })
            }
            else {
                res.status(500).json({
                    is_error: true,
                    error_message: err.message,
                    data: {}
                })
            }
        }
    })
    app.listen(serverConfig.SERVER_PORT, () => {
        console.log(`server listening on port : ${serverConfig.SERVER_PORT}`)
    })
};
startServer();