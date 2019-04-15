const mysql = require('mysql');

const connection = mysql.createConnection({

    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password:'',
    database:'spac'

});

connection.connect( function(err){ 
    if ( err ) {  
      console.erro('erro de conexão:  ' + err.stack);
      retorno ;
    }
    console.log('conectado como id  ' + connection . threadId );
  });

module.exports = connection;