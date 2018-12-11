// var EntitySchema = require("typeorm").EntitySchema; // import {EntitySchema} from "typeorm";
// var Cliente = require("../models/Cliente").Cliente; // import {Category} from "../model/Category";

module.exports = {
    name: "Cliente",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        codigo: {
            type: "varchar"
        },
        nombres: {
            type: "varchar"
        },
        apellidos: {
            type: "varchar"
        },
        dni: {
            type: "varchar"
        },
        email: {
            type: "varchar"
        },
        celular: {
            type: "varchar"
        }
    }
};