var Cliente = require("../app/models/client");
var mysql = require('mysql');
var repository = require('../repositories/client-repository');

exports.post = async (req,res)=>{
    try{
        await repository.post({
            nome: req.body.nome,
            cpf: req.body.preco,
        });
        res.status(201).send({
            message:"Cliente cadastrado com sucesso"
        });
    }catch(e){
        console.log(e);
        res.status(500).send({
        message:"Falha ao processar a requisição",
        });
    }
}