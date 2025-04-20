const serverConfig = require('./server-config.js');
const dbObj = {
    development: {
        username: serverConfig.DB_USER || 'root',
        password: serverConfig.DB_PASSWORD || null,
        database: serverConfig.DB_NAME || 'task_manager',
        host: serverConfig.DB_HOST || '127.0.0.1',
        port: serverConfig.DB_PORT || '3307',
        dialect: 'mysql',
    },
    test: {
        username: '',
        password: '',
        database: '',
        host: '',
        dialect: 'mysql',
    },
    production: {
        use_env_variable: 'DATABASE_URL',
        dialect: 'mysql',
    }
};
module.exports = dbObj[serverConfig.NODE_ENV];