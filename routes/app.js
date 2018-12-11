var express = require('express');

var app = express();


app.get('/', (req, resp, next) => {

    resp.status(200).json({
        ok: true,
        mensaje: 'Petición realizada correctamente'
    });
});


module.exports = app;