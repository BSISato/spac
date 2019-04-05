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


    connection.query("INSERT INTO endereco (logradouro,numero,complemento,bairro,cidade,uf) VALUES ('" + data.logradouro + "','" + data.numero + "','" + data.complemento + "','" + data.bairro + "','" + data.cidade + "','" + data.uf + "')"), function (error,results,fields) {
        if (error) throw error;
        console.log(results.insertId);
    };
   // connection.query("")
   // connection.query("INSERT INTO pessoa (nome) VALUES ('"+last_insert_id+"')", function(error){
  //       if(error) throw error;
  //  });
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

