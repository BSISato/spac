const express = require('express');
var router = express.Router();//interceptação das rotas
const controller = require('../controllers/medic-controller');


//POST
router.post("/", controller.post);
//rota de get byid
router.get('/:MedicoId', controller.getById);
//rota get
router.get('/', controller.getAll);
//rota deletar
router.delete('/:MedicoId',controller.delete); 
//rota altera
router.put('/:MedicoId', controller.put);

module.exports = router;