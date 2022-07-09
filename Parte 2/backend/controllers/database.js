import { Sequelize, DataTypes} from 'sequelize';
import dotenv from 'dotenv'

dotenv.config();    

const sequelize = new Sequelize(process.env.REACT_APP_DATABASE_NAME, process.env.REACT_APP_DATABASE_USER,process.env.REACT_APP_DATABASE_PASSWORD, {
    host: process.env.REACT_APP_DATABASE_HOST,
    port: process.env.REACT_APP_DATABASE_PORT,
    dialect: 'mariadb' 
});

const initTable = async () => {

    console.log("ENTROU initTable")

    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

    console.log("ENTROU initTable2")

const catsQuery = sequelize.define("catsQuery", {
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
}, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci'
  });

await catsQuery.sync();

console.log("Sequelized synced")

}

//addSearchResult
export const addCat = async (req, res) => {
    
    
    console.log("ENTROU addCAT")

    let query = req.body.query;

    let content = req.body.content;

    

    if(!query) {
        res.status(400);
        res.send("Route must have a tag!");
        return;
    } 
    if(!content) {
        res.status(400);
        res.send("Route must have a content!");
        return;
    } 


    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }


    await initTable();

    
    const catsQuery = sequelize.define('catsQuery', {
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
    }, {
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci'
      });


    const queries = await catsQuery.create({ query, content})
   
    
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS, POST, GET")
    res.setHeader("Access-Control-Allow-Origin",  "*")
    res.status(200);
    res.send(queries);
}
//findSearchResult
export const matchID = async (req, res) => {
    
    let id = req.query.id;

    if(!id) {
        res.status(400);
        res.send("Route must have a id!");
        return;
    }

    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
    
    await initTable();

    const catsQuery = sequelize.define('catsQuery', {
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

    const queries = await catsQuery.findOne({id});

    res.setHeader("Access-Control-Allow-Origin",  "*")
    res.status(200);
    res.send(queries);

}


//getAllSearchResult
export const getAll = async (req, res) => { 
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

    await initTable();

    const catsQuery = sequelize.define('catsQuery', {
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

    const queries = await catsQuery.findAll();

    res.setHeader("Access-Control-Allow-Origin",  "*")
    res.status(200);
    res.send(queries);
}