import express from 'express';
import {httpGetAllStructures,httpGetActiveStructure, httpAddNewStructure} from "./structures.controller.mjs";
export const structuresRouter = express.Router();

structuresRouter.get('/all', httpGetAllStructures);
structuresRouter.get('/:id', httpGetActiveStructure);
structuresRouter.post("/add", httpAddNewStructure);

