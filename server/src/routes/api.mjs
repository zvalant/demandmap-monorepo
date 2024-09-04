import express from 'express';
import {structuresRouter} from "./structures/structures.router.mjs";

export const api = express.Router();

api.use('/structures', structuresRouter);