const express = require('express');

const routes = express.Router();

const {listarCarros, insertarCarro} = require('../controllers/CarrosController');

routes.get('/', listarCarros);
routes.post('/', insertarCarro)

module.exports = routes;