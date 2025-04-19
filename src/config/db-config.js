import serverConfig from './server-config.js';

const dbObj= {
  development: {
    username: serverConfig.DB_USER || 'root',
    password: serverConfig.DB_PASSWORD || null,
    database: serverConfig.DB_NAME || 'task_manager',
    host: serverConfig.DB_HOST || '127.0.0.1',
    port:serverConfig.DB_PORT || '3306',
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
    use_env_variable: serverConfig.DATABASE_URL,
    dialect: 'mysql',
  }
};
export default dbObj[serverConfig.NODE_ENV];