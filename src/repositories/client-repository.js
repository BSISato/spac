//quem irá procurar aqui é o controller
var Cliente = require('../app/models/client');
var mysql = require('mysql');

//POST
exports.post = async(data) =>{
    var client = new Cliente(data);
   // execSQLQuery(`INSERT INTO Clientes(Nome, CPF) VALUES('${nome}','${cpf}')`, res);
    await client.save();
}