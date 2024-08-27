const express = require('express');

const { httpGetAllStructures, httpGetActiveStructure } = require('./structures.controller.mjs');

const structuresRouter = express.Router();

structuresRouter.get('/structures/', httpGetAllStructures);
structuresRouter.get('structures/:id', httpGetActiveStructure);

