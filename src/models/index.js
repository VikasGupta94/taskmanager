import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes } from 'sequelize';
import { fileURLToPath, pathToFileURL } from 'url';
import dbConfig from '../config/db-config.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basename = path.basename(__filename); 

const db = {};
let sequelize;
//  Use DATABASE_URL from config
if (dbConfig.use_env_variable) {
  sequelize = new Sequelize(dbConfig.use_env_variable, dbConfig);
} else {
  sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);
}

//  Load all model files in the same directory
const files = fs
  .readdirSync(__dirname)
  .filter(file => (
    file.indexOf('.') !== 0 &&
    file !== basename &&
    file.endsWith('.js') &&
    !file.endsWith('.test.js')
  ));

//  Use file URL for dynamic import
for (const file of files) {
  const fullPath = path.join(__dirname, file);
  const modelModule = await import(pathToFileURL(fullPath)); 
  const model = modelModule.default(sequelize, DataTypes);
  db[model.name] = model;
}

//  Setup associations
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

//  Export sequelize instance and all models
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
