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

exports.getById = async (req, res) => {
    try {
        var data = req.params.id;
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar a requisição (ID)",
            erro: error
        })
    }
} 

