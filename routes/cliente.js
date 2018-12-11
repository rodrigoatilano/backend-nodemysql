var express = require('express');
var createConnection = require('typeorm').createConnection;
var app = express();

// Connection DB
var connection = createConnection();

// Promise connection
connection.then((result) => {

    var Cliente = result.getRepository("cliente");

    // ======================================================
    // Obtener todos los clientes
    // ======================================================
    app.get('/', (req, res, next) => {

        var desde = req.query.desde || 0;
        desde = Number(desde);

        Cliente
            .createQueryBuilder()
            .skip(desde)
            .take(5)
            .getMany()
            .then((allclientes) => {

                Cliente.createQueryBuilder()
                    .select("COUNT(id)")
                    .getCount()
                    .then((totalClientes) => {

                        res.status(200).json({
                            ok: true,
                            Clientes: allclientes,
                            totalClientes: totalClientes
                        });

                    });
            })
            .catch((err) => {

                return res.status(500).json({
                    ok: false,
                    erros: err
                });
            });

    });

    // ======================================================
    // Obtenerlos por ID
    // ======================================================
    app.get('/:id', (req, res) => {

        var id = req.params.id;

        Cliente
            .createQueryBuilder()
            .where("id = :id", { id })
            .getOne()
            .then((clientes) => {

                if (!clientes) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'El cliente con el id ' + id + ' no existe',
                        errors: {
                            message: 'No existe un cliente con ese ID '
                        }
                    });
                }
                res.status(200).json({
                    ok: true,
                    Clientes: clientes
                });
            })
            .catch((err) => {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar el cliente',
                    errors: err
                });
            });
    });

    // ======================================================
    // Crear clientes
    // ======================================================
    app.post('/', (req, res) => {

        var body = req.body;

        Cliente.createQueryBuilder()
            .insert()
            .into("Cliente")
            .values([{
                codigo: body.codigo,
                nombres: body.nombres,
                apellidos: body.apellidos,
                dni: '4621',
                email: body.email,
                celular: body.celular
            }])
            .execute()
            .then((clienteGuardado) => {

                res.status(201).json({
                    ok: true,
                    IdInsertado: clienteGuardado.raw
                });
            })
            .catch((err) => {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al crear cliente',
                    errors: err
                });
            })
    });

    // ======================================================
    // Actualizar clientes
    // ======================================================

    app.put('/:id', (req, res) => {

        var id = req.params.id;
        var body = req.body;

        Cliente.createQueryBuilder()
            .where("id = :id", { id })
            .getOne()
            .then((clientes) => {

                if (!clientes) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'El cliente con el id ' + id + ' no existe',
                        errors: { mensaje: 'No existe un cliente con ese ID' }
                    });
                }

                Cliente.createQueryBuilder()
                    .update('Cliente')
                    .set({
                        nombres: clientes.nombres = body.nombres,
                        apellidos: clientes.apellidos = body.apellidos,
                        celular: clientes.celular = body.celular
                    })
                    .where("id = :id", { id })
                    .execute()
                    .then(() => {

                        res.status(200).json({
                            ok: true,
                            mensaje: 'El cliente ' + clientes.nombres + ' ha sido actualizado',
                            cliente: clientes
                        });
                    })
                    .catch(err => {
                        return res.status(400).json({
                            ok: false,
                            mensaje: 'Error al actualizar cliente',
                            errors: err
                        });
                    });
            })
            .catch(err => {

                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar cliente',
                    errors: err
                });
            });

    });

    // ======================================================
    // Eliminar por ID
    // ======================================================

    app.delete('/:id', (req, res) => {

        var id = req.params.id;
        var body = req.body;

        Cliente.createQueryBuilder()
            .where("id = :id", { id })
            .getOne()
            .then((clientes) => {

                if (!clientes) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'El cliente con el id ' + id + ' no existe',
                        errors: { mensaje: 'No existe un cliente con ese ID' }
                    });
                }

                Cliente.createQueryBuilder()
                    .delete()
                    .from('Cliente')
                    .where("id = :id", { id })
                    .execute()
                    .then(() => {

                        res.status(200).json({
                            ok: true,
                            mensaje: 'El cliente ' + clientes.nombres + ' Se ha eliminado',
                            cliente: clientes
                        });
                    })
                    .catch(err => {
                        return res.status(400).json({
                            ok: false,
                            mensaje: 'Error al eliminar cliente',
                            errors: err
                        });
                    });
            })
            .catch(err => {

                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar cliente',
                    errors: err
                });
            });

    });


}).catch(function(error) {
    console.log("Error: ", error);
});


module.exports = app;