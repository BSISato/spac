const mysql = require('mysql');
const Schema = mysql.Schema;

/*const connection = mysql.createConnection({

    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password:'',
    database:'spac'

});
*/
var clienteSchema = new Schema({
    nome: String,
    cpf: Number
})

module.exports = mysql.model('Cliente',clienteSchema);