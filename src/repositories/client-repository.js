//quem irá procurar aqui é o controller
var Cliente = require('../app/models/client');
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
     data.cidade + "','" + data.uf + "')"), function (error,results,fields) {
        if (error) throw error;
    };
    
    connection.query("SELECT last_insert_id() as id FROM endereco", function (err, idend) {
        if (err) throw error;
       // var id_end = idend[0].id;
       // console.log(id_end);
    //});
    connection.query("INSERT INTO pessoa (nome,datanascimento,email,senha,telefone,celular,endereco_idendereco) VALUES ('" +
    data.nome + "','" + data.datanascimento + "','" + data.email + "','" + data.senha + "','" + 
    data.telefone + "','" + data.celular + "','" + idend[0].id + "')"), function (error,results,fields) {
        if (error) throw error;
    }});
  
}

//getById
exports.getById = async (idcliente) => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM cliente WHERE idCliente =" + idcliente, function (err, data, fields) {

            if (err)
                resolve(err);

            resolve(data);
        });
    });
}
//get
exports.get = async () => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM cliente", function (err, data, fields) {
            console.log(data)
            if (err)
                resolve(err);

            resolve(data);
        });
    });
}

