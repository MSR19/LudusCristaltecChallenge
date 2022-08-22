import {catsQuery, sequelize} from '../models/CatQuery.js'

//addSearchResult
export const addCat = async (req, res) => {

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
        
        const queries = await catsQuery.create({ query, content})
   
    
        res.setHeader('Access-Control-Allow-Headers', '*');
        res.setHeader("Access-Control-Allow-Methods", "OPTIONS, POST, GET")
        res.setHeader("Access-Control-Allow-Origin",  "*")
        res.status(200);
        res.send(queries);

    } catch (error) {
        console.error('Unable to connect to the database:', error);
        res.status(408);
        res.send();
    }
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
        
        const queries = await catsQuery.findOne({id});

        res.setHeader("Access-Control-Allow-Origin",  "*")
        res.status(200);
        res.send(queries);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        res.status(408);
        res.send();
    }
}


//getAllSearchResult
export const getAll = async (req, res) => { 
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        
        const queries = await catsQuery.findAll();
    
        res.setHeader("Access-Control-Allow-Origin",  "*")
        res.status(200);
        res.send(queries);

    } catch (error) {
        console.error('Unable to connect to the database:', error);
        res.status(408);
        res.send();
    }

}