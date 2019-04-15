const express = require('express');
var router = express.Router();//interceptação das rotas
const controller = require('../controllers/consulta-controller');


//POST
router.post("/", controller.post);
//rota de get byid
router.get('/:ConsultaId', controller.getById);
//rota get
router.get('/', controller.getAll);
//rota deletar
router.delete('/:ConsultaId',controller.delete); 
//rota altera
router.put('/:ConsultaId', controller.put);

module.exports = router;