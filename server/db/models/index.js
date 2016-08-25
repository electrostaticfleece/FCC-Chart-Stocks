import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import sequelizeConfig from '../sequelize_config';
const ENV = process.env.NODE_ENV;
const config = sequelizeConfig[ENV];
const basename = path.basename(module.filename);
const db = {};
let sequelize;
const dbUrl = process.env[config.use_env_variable];

if (dbUrl) {
  sequelize = new Sequelize(dbUrl);
} else {
  const line = (ENV === 'development') ? 3 : 11;
  throw new TypeError('use_env_variable is not defined', 'sequelize_config.js', line);
}

fs
  .readdirSync(__dirname)
  .filter((file) =>
    (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
  )
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;