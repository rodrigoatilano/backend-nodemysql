/*export */
class Cliente {
    constructor(id, codigo, nombres, apellidos, dni, email, celular) {
        this.id = id;
        this.codigo = codigo;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.dni = dni;
        this.email = email;
        this.celular = celular;
    }
}

module.exports = {
    Cliente: Cliente
};