const express = require('express');
var router = express.Router();//interceptação das rotas
const controller = require('../controllers/clinic-controller');


//POST
router.post("/", controller.post);
//rota de get byid
router.get('/:ClinicaId', controller.getById);
//rota get
router.get('/', controller.getAll);
//rota deletar
router.delete('/:ClinicaId',controller.delete); 
//rota altera
router.put('/:ClinicaId', controller.put);

module.exports = router;