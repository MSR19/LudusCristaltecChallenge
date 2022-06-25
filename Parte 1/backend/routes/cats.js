import express from "express";

import {getTags, getCat, matchCat } from "../controllers/cats.js"

const router = express.Router();

router.get('/tags', getTags);

router.get('/cats/filter', getCat);

router.get('/cats/match', matchCat);

export default router;