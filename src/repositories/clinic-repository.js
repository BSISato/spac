//quem irá procurar aqui é o controller
var Medico = require('../app/models/clinic');
var connection = require('../connection/connection');
var mysql = require('mysql');

//POST
exports.post = async (data) => {
    connection.query("INSERT INTO endereco (logradouro,numero,complemento,bairro,cidade,uf) VALUES ('" +
        data.logradouro + "','" + data.numero + "','" + data.complemento + "','" + data.bairro + "','" +
        data.cidade + "','" + data.uf + "')"), function (error, results, fields) {
            if (error) throw error;
        };

    connection.query("SELECT last_insert_id() as ide FROM endereco", function (err, idend) {
        if (err) throw error;

        connection.query("INSERT INTO consultorio(nome, cnpj, telefone, descricao, endereco_idEndereco) VALUES('" +
            data.nome + "','" + data.cnpj + "','" + data.telefone + "','"+ data.descricao + "','" 
            + idend[0].ide + "')"), function (error, results, fields) {
                if (error) throw error;
         }
    });
}
//getById
exports.getById = async (idClinica) => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM CONSULTORIO c, ENDERECO e WHERE " +
            "c.endereco_idendereco = e.idendereco and c.idconsultorio =" + idClinica, function (err, data, fields) {
                if (err)
                    resolve(err);

                resolve(data);
            });
    });
}
//get
exports.get = async () => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM CONSULTORIO c, ENDERECO e WHERE " +
            "c.endereco_idendereco = e.idendereco", function (err, data, fields) {
                if (err)
                    resolve(err);

                resolve(data);
            });
    });
}
//DELETE
exports.delete = async (id) => {
    connection.query("create temporary table tempIdEnd SELECT e.idendereco FROM consultorio c, endereco e where " +
        "e.idendereco = c.endereco_idendereco and c.idconsultorio = '" + id + "'");

    connection.query("DELETE FROM endereco where idendereco = (select idendereco from tempIdEnd)");
    connection.query("DROP TABLE tempIdEnd");

    connection.query("DELETE FROM consultorio WHERE idconsultorio =" + id);

}
//PUT
exports.put = async (dados) => {

    connection.query("create temporary table tempIdEnd SELECT e.idendereco FROM consultorio c, endereco e where " +
    "e.idendereco = c.endereco_idendereco and c.idconsultorio = '" + dados.idClin + "'");

    connection.query("UPDATE endereco set logradouro = '" + dados.logradouro + "',numero = '" + dados.numero + "'," +
        "complemento = '" + dados.complemento + "',bairro = '" + dados.bairro + "',cidade = '" + dados.cidade + "'," +
        "uf = '" + dados.uf + "'where idendereco = (select idendereco from tempIdEnd)");
    connection.query("DROP TABLE tempIdEnd");


    connection.query("UPDATE consultorio set nome = '" + dados.nome + "', cnpj = '" + dados.cnpj + "'," +
        "telefone = '" + dados.telefone + "',descricao = '" + dados.descricao + "' where idconsultorio = '" + dados.idClin + "'");


}

