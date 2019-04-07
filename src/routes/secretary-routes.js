const express = require('express');
var router = express.Router();//interceptação das rotas
const controller = require('../controllers/secretary-controller');


//POST
router.post("/", controller.post);
//rota de get byid
router.get('/:SecretariaId', controller.getById);
//rota get
router.get('/', controller.getAll);
//rota deletar
router.delete('/:SecretariaId',controller.delete); 
//rota altera
router.put('/:SecretariaId', controller.put);

module.exports = router;