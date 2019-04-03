var Cliente = require("../app/models/client");
var mysql = require('mysql');
var repository = require('../repositories/client-repository');

exports.post = async (req, res) => {
    try {
        await repository.post({
            nome: req.body.nome,
            cpf: req.body.cpf,
        });
        res.status(201).send({
            message: "Cliente cadastrado com sucesso"
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: "Falha ao processar a requisição",
        });
    }
}

exports.getById = async (req,res) => {
    const idCli = req.params.ClientId;
    //console.log(idCli);
    try {
        var data =  await repository.getById(idCli);
        res.status(200).send(data);    
       //     message:"Cliente:",
       //     resultadoreq
       // });
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar a requisição (ID)" + error,
            erro: error
        })
    }
} 
exports.getAll= async (req,res) => {
    try {
        var data =  await repository.get();
        res.status(200).send(data);    
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar a requisição de clientes" + error,
            erro: error
        })
    }
}

