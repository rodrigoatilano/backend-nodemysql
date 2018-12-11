// Requires
var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');

// Inicializar variables
var app = express();

// CORS (peticiones)
// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Body parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Escuchar peticiones
app.listen(85, () => {
    console.log('Express server puerto 82: \x1b[32m%s\x1b[0m', 'en linea');
});


// Importar rutas
var appRoutes = require('./routes/app');
var clienteRoutes = require('./routes/cliente');
var busquedaRoutes = require('./routes/busqueda');

// // Rutas
app.use('/busqueda', busquedaRoutes);
app.use('/cliente', clienteRoutes);
app.use('/', appRoutes);

module.exports = app;

// var http = require('http');
// http.createServer(function(req, res) {
//     res.writeHead(200, { 'Content-Type': 'text/plain' });
//     res.end('Hello Apache!\n');
// }).listen(82, '127.0.0.1');