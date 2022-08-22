import { Console } from "console";
import express from "express";

import https from 'https'

const getTagsAux  = () => {
    return new Promise ( (resolve) => 
        https.get('https://cataas.com/api/tags', (resp) => {
            let data = '';
    
            resp.on('data', (chunk) => {
                data += chunk;
            });
      
            resp.on('end', () => {
                resolve(JSON.parse(data));
            });
      
        }).on("error", (err) => {
            console.log("Error: " + err.message);
        }));
}

const getCatAux  = (tag, omit, total) => {
    return new Promise ( (resolve) => 
        https.get('https://cataas.com/api/cats?tags=' + tag + '&skip=' + omit + '&limit=' + total, (resp) => {
            let data = '';
    
            resp.on('data', (chunk) => {
                data += chunk;
            });
      
            resp.on('end', () => {
                resolve(JSON.parse(data));
            });
      
        }).on("error", (err) => {
            console.log("Error: " + err.message);
        }));
}

const matchCatAux = (tag) => {
    return new Promise ( (resolve) => 
    https.get('https://cataas.com/api/cats?tags=' + tag, (resp) => {
        let data = '';

        resp.on('data', (chunk) => {
            data += chunk;
        });
  
        resp.on('end', () => {
            resolve(JSON.parse(data));
        });
  
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    }));
}

export const getTags = async (req, res) => {

    let tags = await getTagsAux();
    
    res.setHeader("Access-Control-Allow-Origin",  "*")
    res.status(200);
    res.send(tags);
}

export const getCat = async (req, res) => {

    let tag = req.query.tag
    let omit = req.query.omit
    let total = req.query.total

    //validate query

    if(!tag) {
        res.status(400);
        res.send("Route must have a tag! Correct route: /api/v1/cats/filter?tag={{filtertag}}&omit={{number}}&total={{number}}");
        return;
    } 
    else if(!omit) {
        res.status(400);
        res.send("Route must have a omit! Correct route: /api/v1/cats/filter?tag={{filtertag}}&omit={{number}}&total={{number}}");
        return;
    } 
    else if(!total) {
        res.status(400);
        res.send("Route must have a total! Correct route: /api/v1/cats/filter?tag={{filtertag}}&omit={{number}}&total={{number}}");
        return;
    } 
    
    let tags = await getTagsAux();

    let valid = tags.find(item => item == tag);

    if (valid == undefined || !valid) {
        res.status(400);
        res.send("Invalid tag!");
        return;
    } 
    
    if (isNaN(omit) && isNaN(parseInt(omit))) {
        res.status(400);
        res.send("Omit must be a number!");
        return;
    }

    if (isNaN(total) && isNaN(parseInt(total))) {
        res.status(400);
        res.send("Total must be a number!");
        return;
    }

    let catsInfo = await getCatAux(tag, omit, total);
    
    res.setHeader("Access-Control-Allow-Origin",  "*")
    res.status(200);
    res.send(catsInfo);
}

export const matchCat = async (req, res) => {

    let string = req.query.string;

    if(!string) {
        res.status(400);
        res.send("Route must have a string! Correct route: /api/v1/cats/match?string={{substr}}");
        return;
    } 

    let tags = await getTagsAux();

    let data = [];

    for (let i = 0; i != tags.length; i++) {
        if(tags[i].includes(string)) {
            let catsInfo = await matchCatAux(tags[i])

            data.push({
                "Tag": tags[i],
                "Content": catsInfo
            });
        }
    }
    
    res.setHeader("Access-Control-Allow-Origin",  "*")
    res.status(200)
    res.send(data)
}
