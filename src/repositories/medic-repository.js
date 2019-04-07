//quem irá procurar aqui é o controller
var Medico = require('../app/models/medic');
var mysql = require('mysql');


const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '',
    database: 'spac'
});

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
            connection.query("INSERT INTO medico(crm, valorConsulta,pessoa_idPessoa) VALUES('" +
                data.crm + "','" +data.valorConsulta+"','"+ idpes[0].idp + "')"), function (error, results, fields) {
                    if (error) throw error;
                }
        });
    });
}
//getById
exports.getById = async (idMedico) => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM MEDICO m, PESSOA p, ENDERECO e WHERE " +
            "m.pessoa_idpessoa = p.idpessoa and " +
            "p.endereco_idendereco = e.idendereco and m.idmedico =" + idMedico, function (err, data, fields) {
                if (err)
                    resolve(err);

                resolve(data);
            });
    });
}
//get
exports.get = async () => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM MEDICO m, PESSOA p, ENDERECO e WHERE " +
            "m.pessoa_idpessoa = p.idpessoa and " +
            "p.endereco_idendereco = e.idendereco", function (err, data, fields) {
                if (err)
                    resolve(err);

                resolve(data);
            });
    });
}
//DELETE
exports.delete = async (id) => {
    connection.query("create temporary table tempIdEnd SELECT e.idendereco FROM medico m, pessoa p, endereco e where "+
    "e.idendereco = p.endereco_idendereco and p.idpessoa = m.pessoa_idpessoa and m.idmedico = '"+id+"'");
    connection.query("create temporary table tempIdPes SELECT p.idpessoa FROM medico m, pessoa p, endereco e where "+
    "e.idendereco = p.endereco_idendereco and p.idpessoa = m.pessoa_idpessoa and m.idmedico = '"+id+"'");

    connection.query("DELETE FROM endereco where idendereco = (select idendereco from tempIdEnd)");
    connection.query("DROP TABLE tempIdEnd");

    connection.query("DELETE FROM pessoa where idpessoa = (select idpessoa from tempIdPes)");
    connection.query("DROP TABLE tempIdPes");

    connection.query("DELETE FROM medico WHERE idmedico =" + id);

    /*
    connection.query("DELETE FROM endereco WHERE idendereco = '"+
    "(SELECT e.idendereco FROM cliente c, pessoa p, endereco e where " +
    "e.idendereco = p.endereco_idendereco and p.idpessoa = c.pessoa_idpessoa and c.idcliente = " + id + "')", function (err, data, fields) {
        if (err)
            console.log(err);
    });
    connection.query("DELETE FROM pessoa WHERE idpessoa = '"+
    "(SELECT p.idpessoa FROM cliente c, pessoa p, endereco e where " +
    "e.idendereco = p.endereco_idendereco and p.idpessoa = c.pessoa_idpessoa and c.idcliente = " + id + "')", function (err, data, fields) {
        if (err)
            console.log(err);
    });
    connection.query('DELETE FROM cliente WHERE idcliente =' + id, function (err) {
        if (err) console.log(err);
    });
    */
}
//PUT
exports.put = async (dados) => {
    
    connection.query("create temporary table tempIdEnd SELECT e.idendereco FROM medico m, pessoa p, endereco e where "+
    "e.idendereco = p.endereco_idendereco and p.idpessoa = m.pessoa_idpessoa and m.idmedico = '"+dados.idMed+"'");
    connection.query("create temporary table tempIdPes SELECT p.idpessoa FROM medico m, pessoa p, endereco e where "+
    "e.idendereco = p.endereco_idendereco and p.idpessoa = m.pessoa_idpessoa and m.idmedico = '"+dados.idMed+"'");

    connection.query("UPDATE endereco set logradouro = '" + dados.logradouro + "',numero = '" + dados.numero + "'," +
        "complemento = '" + dados.complemento + "',bairro = '" + dados.bairro + "',cidade = '" + dados.cidade + "'," +
        "uf = '" + dados.uf + "'where idendereco = (select idendereco from tempIdEnd)");
    connection.query("DROP TABLE tempIdEnd");

    connection.query("UPDATE pessoa set nome = '" + dados.nome + "',dataNascimento = '" + dados.dataNascimento + "'," +
    "email = '" + dados.email + "',senha = '" + dados.senha + "',telefone = '" + dados.telefone + "'," +
    "celular = '" + dados.celular + "'where idpessoa = (select idpessoa from tempIdPes)");
    connection.query("DROP TABLE tempIdPes");  
    
    connection.query("UPDATE medico set crm = '"+dados.crm+"', valorConsulta = '"+dados.valorConsulta+"'"+
    "where idmedico = '"+dados.idMed+"'");

    /*
    connection.query("UPDATE endereco set logradouro = '" + dados.logradouro + "',numero = '" + dados.numero + "'," +
        "complemento = '" + dados.complemento + "',bairro = '" + dados.bairro + "',cidade = '" + dados.cidade + "'," +
        "uf = '" + dados.uf + "'where idendereco = '" +
        "(SELECT e.idendereco FROM cliente c, pessoa p, endereco e where " +
        "e.idendereco = p.endereco_idendereco and p.idpessoa = c.pessoa_idpessoa and c.idcliente = " + dados.idCli + "')", function (err, data, fields) {
            if (err)
                console.log(err);
        });

    connection.query("UPDATE pessoa set nome = '" + dados.nome + "',dataNascimento = '" + dados.dataNascimento + "'," +
        "email = '" + dados.email + "',senha = '" + dados.senha + "',telefone = '" + dados.telefone + "'," +
        "celular = '" + dados.celular + "'where idpessoa = '" +
        "(SELECT p.idpessoa FROM cliente c, pessoa p, endereco e where " +
        "e.idendereco = p.endereco_idendereco and p.idpessoa = c.pessoa_idpessoa and c.idcliente = " + dados.idCli + "')", function (err, data, fields) {
            if (err)
                console.log(err);
        });
    connection.query("UPDATE cliente set convenioMedico = '"+dados.convenioMedico+"'where idcliente = '"+dados.idCli+"'", function (err, data, fields) {
        if (err)
            console.log(err);
        });
        */
    }

