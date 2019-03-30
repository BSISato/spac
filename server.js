const express = require('express');
const bodyParser = require('body-parser');
const app = express();         
const port = 3000; //porta padrão
const mysql = require('mysql');

//configuração do server para usar o body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//definindo as rotas
var indexRoute = require("./src/routes/index-routes");
var clientRoute = require('./src/routes/client-routes');

//vincular a aplicação (app) com o motor de rotas
app.use('/api',indexRoute);
//Rotas para produtos
app.use('/client',clientRoute);

app.listen(port, () => {
    console.log('Server up and running!!!');

});