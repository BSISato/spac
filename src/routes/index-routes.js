const express = require('express');
var router = express.Router();//interceptação das rotas

//Middleware
router.use(function (req, res, next) {
    //aqui poderá ser implementadas rotinas de 
    //LOGs,VALIDAÇÕES,ERROS
    console.log('Interceptação pelo middleware');
    next();
});

router.get('/', (req, res) => res.json({'message': 'rota teste ok'}));

module.exports = router;