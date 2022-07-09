import express from "express";

import {addCat, matchID, getAll } from "../controllers/database.js"

const router = express.Router();

//router.get('/', initDatabase);

router.post('/addSearchResult', addCat);

router.get('/findSearchResult', matchID);

router.get('/getAllSearchResult', getAll);

export default router;