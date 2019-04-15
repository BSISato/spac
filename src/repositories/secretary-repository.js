//quem irá procurar aqui é o controller
var Secretaria = require('../app/models/secretary');
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

        connection.query("INSERT INTO pessoa (nome,dataNascimento,email,senha,telefone,celular,endereco_idendereco) VALUES ('" +
            data.nome + "','" + data.dataNascimento + "','" + data.email + "','" + data.senha + "','" +
            data.telefone + "','" + data.celular + "','" + idend[0].ide + "')"), function (error, results, fields) {
                if (error) throw error;
            }
        connection.query("SELECT last_insert_id() as idp FROM pessoa", function (err, idpes) {
            if (err) throw error;
            connection.query("INSERT INTO secretaria(pessoa_idPessoa) VALUES('" +
                + idpes[0].idp + "')"), function (error, results, fields) {
                    if (error) throw error;
                }
        });
    });
}
//getById
exports.getById = async (idSecretaria) => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM SECRETARIA s, PESSOA p, ENDERECO e WHERE " +
            "s.pessoa_idpessoa = p.idpessoa and " +
            "p.endereco_idendereco = e.idendereco and m.idmedico =" + idSecretaria, function (err, data, fields) {
                if (err)
                    resolve(err);

                resolve(data);
            });
    });
}
//get
exports.get = async () => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM SECRETARIA s, PESSOA p, ENDERECO e WHERE " +
            "s.pessoa_idpessoa = p.idpessoa and " +
            "p.endereco_idendereco = e.idendereco", function (err, data, fields) {
                if (err)
                    resolve(err);

                resolve(data);
            });
    });
}
//DELETE
exports.delete = async (id) => {
    connection.query("create temporary table tempIdEnd SELECT e.idendereco FROM secretaria s, pessoa p, endereco e where "+
    "e.idendereco = p.endereco_idendereco and p.idpessoa = s.pessoa_idpessoa and m.idmedico = '"+id+"'");
    connection.query("create temporary table tempIdPes SELECT p.idpessoa FROM secretaria s, pessoa p, endereco e where "+
    "e.idendereco = p.endereco_idendereco and p.idpessoa = s.pessoa_idpessoa and m.idmedico = '"+id+"'");

    connection.query("DELETE FROM endereco where idendereco = (select idendereco from tempIdEnd)");
    connection.query("DROP TABLE tempIdEnd");

    connection.query("DELETE FROM pessoa where idpessoa = (select idpessoa from tempIdPes)");
    connection.query("DROP TABLE tempIdPes");

    connection.query("DELETE FROM secretaria WHERE idsecretaria =" + id);

}
//PUT
exports.put = async (dados) => {
    
    connection.query("create temporary table tempIdEnd SELECT e.idendereco FROM medico m, pessoa p, endereco e where "+
    "e.idendereco = p.endereco_idendereco and p.idpessoa = m.pessoa_idpessoa and m.idmedico = '"+dados.idSec+"'");
    connection.query("create temporary table tempIdPes SELECT p.idpessoa FROM medico m, pessoa p, endereco e where "+
    "e.idendereco = p.endereco_idendereco and p.idpessoa = m.pessoa_idpessoa and m.idmedico = '"+dados.idSec+"'");

    connection.query("UPDATE endereco set logradouro = '" + dados.logradouro + "',numero = '" + dados.numero + "'," +
        "complemento = '" + dados.complemento + "',bairro = '" + dados.bairro + "',cidade = '" + dados.cidade + "'," +
        "uf = '" + dados.uf + "'where idendereco = (select idendereco from tempIdEnd)");
    connection.query("DROP TABLE tempIdEnd");

    connection.query("UPDATE pessoa set nome = '" + dados.nome + "',dataNascimento = '" + dados.dataNascimento + "'," +
    "email = '" + dados.email + "',senha = '" + dados.senha + "',telefone = '" + dados.telefone + "'," +
    "celular = '" + dados.celular + "'where idpessoa = (select idpessoa from tempIdPes)");
    connection.query("DROP TABLE tempIdPes");  
    
    connection.query("UPDATE medico set crm = '"+dados.crm+"', valorConsulta = '"+dados.valorConsulta+"'"+
    "where idmedico = '"+dados.idSec+"'");


    }

