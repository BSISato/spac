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
    console.log(data);
    connection.query('INSERT INTO clientes SET ?', data, function (error, results, fields) {
        if (error) throw error;
    });
}

//getById
exports.getById = async (idcliente) => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM clientes", function (err, data, fields) {

            if (err)
                resolve(err);

            resolve(data);
        });
    });
}

