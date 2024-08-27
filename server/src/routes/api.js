const express = require('express');

const structuresRouter = require('./structures/structures.router.mjs')

const api = express.Router();

api.use('/structures', structuresRouter);