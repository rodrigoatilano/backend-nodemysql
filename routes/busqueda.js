var express = require('express');
var createConnection = require('typeorm').createConnection;
var app = express();

// Connection DB
var connection = createConnection();

// Promise connection
connection.then((result) => {

    var Cliente = result.getRepository("cliente");

    // ======================================================
    // Busqueda por tablas
    // ======================================================
    app.get('/coleccion/:tabla/:busqueda', (req, res, next) => {

        var tabla = req.params.tabla;
        var busqueda = req.params.busqueda;

        // console.log(tabla);

        var promesa;

        switch (tabla) {
            case 'clientes':

                promesa = buscarClientes(busqueda);

                break;

            default:

                return res.status(400).json({
                    ok: false,
                    mensaje: 'Los tipos de busqueda sólo son: Clientes',
                    error: { message: 'Tipo de tabla/coleccion no valido' }
                });
        }

        promesa.then(data => {

            res.status(200).json({
                ok: true,
                [tabla]: data
            });
        })

    });

    // ======================================================
    // Buscar Clientes
    // ======================================================

    function buscarClientes(busqueda) {


        return new Promise((resolve, reject) => {

            Cliente.createQueryBuilder()
                .where("nombres like :nombres", { nombres: '%' + busqueda + '%' })
                .orWhere("apellidos like :apellidos", { apellidos: '%' + busqueda + '%' })
                .orWhere("dni like :dni", { dni: '%' + busqueda + '%' })
                .orWhere("email like :email", { email: '%' + busqueda + '%' })
                .orWhere("celular like :celular", { celular: '%' + busqueda + '%' })
                .limit(10)
                .getMany()
                .then((clientes) => {

                    resolve(clientes);

                })
                .catch((err) => {
                    console.log('Error al cargar clientes', err);
                });

        });

    }

}).catch(function(error) {
    console.log("Error: ", error);
});

module.exports = app;