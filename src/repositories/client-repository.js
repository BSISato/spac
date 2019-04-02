//quem irá procurar aqui é o controller
var Cliente = require('../app/models/client');
var mysql = require('mysql');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'ameerj',
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
    try {
        var id = idcliente.id
        var where = " where idclientes=" + id;
         connection.query("SELECT * FROM clientes " + where, function (err, result,fields){
             console.log(result);
                    return result;
            });
    } catch (error) {
        console.log(error)
    }finally{
        connection.end
    }

    
}

