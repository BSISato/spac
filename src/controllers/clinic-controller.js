var Medico = require("../app/models/clinic");
var mysql = require('mysql');
var repository = require('../repositories/clinic-repository');

exports.post = async (req, res) => {
    try {
        await repository.post({
            
            nome: req.body.nome,
            cnpj: req.body.cnpj,
            telefone: req.body.telefone,
            descricao: req.body.descricao,
            logradouro: req.body.logradouro,
            numero: req.body.numero,
            complemento: req.body.complemento,
            bairro: req.body.bairro,
            cidade: req.body.cidade,
            uf: req.body.uf
        });
        res.status(200).send({
            message: "Clinica cadastrada com sucesso"
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: "Falha ao processar a requisição",
        });
    }
}

exports.getById = async (req, res) => {
    const idClin = req.params.ClinicaId;
    try {
        var data = await repository.getById(idClin);

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
exports.getAll = async (req, res) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar a requisição de clinica" + error,
            erro: error
        })
    }
}
exports.delete = async (req, res) =>{
    const idClin = req.params.ClinicaId;
    try {
        await repository.delete(idClin);
        res.status(200).send({
            message:"Clinica removida com sucesso"
        });
    
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar a requisição (ID)" + error,
            erro: error
        })
    }
}
exports.put = async (req,res) =>{
    const idClin = req.params.ClinicaId;
    try {
        await repository.put({
            nome: req.body.nome,
            cnpj: req.body.cnpj,
            telefone: req.body.telefone,
            descricao: req.body.descricao,
            logradouro: req.body.logradouro,
            numero: req.body.numero,
            complemento: req.body.complemento,
            bairro: req.body.bairro,
            cidade: req.body.cidade,
            uf: req.body.uf,
            idClin
        });
        res.status(200).send({
            message: "Dados da Clinica alterado com sucesso"
        });
    }catch (error) {
        res.status(500).send({
            message: "Falha na tentativa de alteração"
        })
    }
}


