import { Sequelize, DataTypes } from  'sequelize';

const sequelize = new Sequelize('catdb', 'root', '1234', {
    host: 'localhost',
    port: "3312",
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

