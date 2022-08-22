import { Sequelize, DataTypes } from  'sequelize';
import dotenv from 'dotenv'
dotenv.config();    

export const sequelize = new Sequelize(process.env.REACT_APP_DATABASE_NAME, process.env.REACT_APP_DATABASE_USER,process.env.REACT_APP_DATABASE_PASSWORD, {
    host: process.env.REACT_APP_DATABASE_HOST,
    port: process.env.REACT_APP_DATABASE_PORT,
    dialect: 'mariadb' 
});

export const catsQuery = sequelize.define('catsQuery', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    query: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    }
});
