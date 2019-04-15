var Secretaria = require("../app/models/secretary");
var mysql = require('mysql');
var repository = require('../repositories/secretary-repository');

exports.post = async (req, res) => {
    try {
        await repository.post({
           
            nome: req.body.nome,
            dataNascimento: req.body.dataNascimento,
            email: req.body.email,
            senha: req.body.senha,
            telefone: req.body.telefone,
            celular: req.body.celular,
            logradouro: req.body.logradouro,
            numero: req.body.numero,
            complemento: req.body.complemento,
            bairro: req.body.bairro,
            cidade: req.body.cidade,
            uf: req.body.uf
        });
        res.status(200).send({
            message: "Secretaria cadastrada com sucesso"
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: "Falha ao processar a requisição",
        });
    }
}

exports.getById = async (req, res) => {
    const idSec = req.params.SecretariaId;
    try {
        var data = await repository.getById(idSec);

        res.status(200).send({
            message:"Secretaria:",
            data
        });
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar a requisição (ID)" + error,
            erro: error
        })
    }
}
exports.getAll = async (req, res) => {
    try {
        var data = await repository.get();
        res.status(200).send({
            message:"Secretarias:",
            data
        });
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar a requisição de secretaria" + error,
            erro: error
        })
    }
}
exports.delete = async (req, res) =>{
    const idSec = req.params.SecretariaId;
    try {
        await repository.delete(idSec);
        res.status(200).send({
            message:"Secretaria removido com sucesso"
        });
    
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar a requisição (ID)" + error,
            erro: error
        })
    }
}
exports.put = async (req,res) =>{
    const idSec = req.params.SecretariaId;
    try {
        await repository.put({
            
            nome: req.body.nome,
            dataNascimento: req.body.dataNascimento,
            email: req.body.email,
            senha: req.body.senha,
            telefone: req.body.telefone,
            celular: req.body.celular,
            logradouro: req.body.logradouro,
            numero: req.body.numero,
            complemento: req.body.complemento,
            bairro: req.body.bairro,
            cidade: req.body.cidade,
            idSec
        });
        res.status(200).send({
            message: "Secretaria alterada com sucesso"
        });
    }catch (error) {
        res.status(500).send({
            message: "Falha na tentativa de alteração"
        })
    }
}


