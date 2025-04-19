import { Sequelize } from 'sequelize';
import { Umzug, SequelizeStorage } from 'umzug';
import dbConfig from './config/db-config.js';

// Setup Sequelize instance
let sequelize;

if (dbConfig.use_env_variable && process.env[dbConfig.use_env_variable]) {
  sequelize = new Sequelize(process.env[dbConfig.use_env_variable], dbConfig);
} else {
  sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    dbConfig
  );
}

// Setup Umzug instance for ESM support
const umzug = new Umzug({
  migrations: {
    glob: 'migrations/*.js', // adjust path if needed
    resolve: ({ name, path, context }) => ({
      name,
      up: async () => (await import(path)).up(context.queryInterface, context.Sequelize),
      down: async () => (await import(path)).down(context.queryInterface, context.Sequelize),
    }),
    context: {
      queryInterface: sequelize.getQueryInterface(),
      Sequelize,
    },
  },
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

// Run all pending migrations
try {
  await umzug.up();
  console.log('✅ Migrations executed successfully');
  process.exit(0);
} catch (error) {
  console.error('❌ Migration failed:', error);
  process.exit(1);
}
