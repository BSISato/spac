const express = require('express');
var router = express.Router();//interceptação das rotas
const controller = require('../controllers/client-controller');


//POST
router.post("/", controller.post);
/*//rota de get byid
router.get('/:productId', controller.getById);
//rota get
router.get('/', controller.getAll);
//rota deletar
router.delete('/delete/:deleteid',controller.delete); 
//rota altera
router.put('/altera/:id', controller.put);
*/
module.exports = router;