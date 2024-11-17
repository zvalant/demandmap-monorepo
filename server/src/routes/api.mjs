import express from 'express';
import {structuresRouter} from "./structures/structures.router.mjs";
/*
Purpose: 
leverages express router to delegate requests to specific controllers depending on requests.
**structures is only controller for application at the moment.
*/
export const api = express.Router();

api.use('/structures', structuresRouter);