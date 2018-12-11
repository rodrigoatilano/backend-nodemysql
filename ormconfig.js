var typeorm = require('typeorm');
var EntitySchema = typeorm.EntitySchema;

module.exports = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "roa",
    password: "01atal1",
    database: "empleos",
    synchronize: true,
    entities: [
        new EntitySchema(require("./entity/Cliente"))
    ],
}