//quem irá procurar aqui é o controller
var Consulta = require('../app/models/consulta');
var connection = require('../connection/connection');
var mysql = require('mysql');


//POST
exports.post = async (data) => {
    connection.query("INSERT INTO consulta (data,situacao,descricao,prontuario,idcliente) VALUES ('" +
        data.data + "','" + data.situacao + "','" + data.descricao + "','" + data.prontuario + "','" +
        data.idcliente + "')"), function (error, results, fields) {
            if (error) throw error;
        };
}
//ESSE GET TEM QUE SER DISCUTIDO O TIME
//getById
exports.getById = async (idConsulta) => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM CONSULTA WHERE idconsulta =" + idConsulta, function (err, data, fields) {
            if (err)
                resolve(err);

            resolve(data);
        });
    });
}
//get
exports.get = async () => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM CONSULTA", function (err, data, fields) {
            if (err)
                resolve(err);

            resolve(data);
        });
    });
}
//DELETE
exports.delete = async (id) => {

    connection.query("DELETE FROM CONSULTA WHERE idconsulta =" + id);

}
//PUT
exports.put = async (dados) => {

    connection.query("UPDATE consulta set data = '" + dados.data + "', situacao = '" + dados.situacao + "',"+
        "descricao = '" + dados.descricao + "', prontuario = '" + dados.prontuario + "',"+
        "idcliente = '" + dados.idcliente + "'" + "where idconsulta = '" + dados.idCons + "'");

}

