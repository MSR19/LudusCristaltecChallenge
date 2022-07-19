import { Sequelize, DataTypes } from  'sequelize';
import dotenv from 'dotenv'
dotenv.config();    

const sequelize = new Sequelize(process.env.REACT_APP_DATABASE_NAME, process.env.REACT_APP_DATABASE_USER,process.env.REACT_APP_DATABASE_PASSWORD, {
    host: process.env.REACT_APP_DATABASE_HOST,
    port: process.env.REACT_APP_DATABASE_PORT,
    dialect: 'mariadb' 
});

export default sequelize.define('catsQuery', {
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



(async () => {
  await sequelize.sync({ force: true });
  // Code here
})();