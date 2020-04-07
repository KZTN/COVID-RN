const express = require('express');
const routes = express.Router();

const CityController = require('./controllers/CityController');

routes.post('/cidades', CityController.store);
routes.post('/cidade', CityController.show);

module.exports = routes;