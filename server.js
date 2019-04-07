const express = require('express');
const bodyParser = require('body-parser');
const app = express();         
const port = 3000; //porta padrão
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


//configuração do server para usar o body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//definindo as rotas
var indexRoute = require("./src/routes/index-routes");
var clientRoute = require('./src/routes/client-routes');
var medicRoute = require('./src/routes/medic-routes');
var secretaryRoute = require('./src/routes/secretary-routes');
var clinicRoute = require('./src/routes/clinic-routes');

//vincular a aplicação (app) com o motor de rotas
app.use('/api',indexRoute);
//Rotas para produtos
app.use('/client',clientRoute);
app.use('/medic',medicRoute);
app.use('/secretary',secretaryRoute);
app.use('/clinic',clinicRoute);


app.listen(port, () => {
    console.log('Server up and running!!!');

});