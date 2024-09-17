import postgres from 'pg';
import { Sequelize } from "sequelize";
import { options } from "../../database/config/config.mjs";

const dbOptions = options;
dbOptions.dialectModule = postgres;

const sequelize = new Sequelize(dbOptions);

export default sequelize;