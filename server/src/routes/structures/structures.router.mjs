import express from 'express';
import {httpGetAllStructures,httpGetActiveStructure, httpAddNewStructure} from "./structures.controller.mjs";
export const structuresRouter = express.Router();
/*
Puropse:
All current API request routes.  Will direct requests to controller dependent on the request route.
*/
structuresRouter.get('/all', httpGetAllStructures);
structuresRouter.get('/:id', httpGetActiveStructure);
structuresRouter.post("/add", httpAddNewStructure);

