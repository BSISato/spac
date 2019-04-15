var Medico = require("../app/models/medic");
var mysql = require('mysql');
var repository = require('../repositories/medic-repository');

exports.post = async (req, res) => {
    try {
        await repository.post({
            crm: req.body.crm,
            valorConsulta: req.body.valorConsulta,
            especialidade: req.body.especialidade,
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
            message: "Medico cadastrado com sucesso"
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: "Falha ao processar a requisição",
        });
    }
}

exports.getById = async (req, res) => {
    const idMed = req.params.MedicoId;
    try {
        var data = await repository.getById(idMed);

        res.status(200).send({
             message:"Medico:",
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
            message:"Medicos:",
            data
        });
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar a requisição de medicos" + error,
            erro: error
        })
    }
}
exports.delete = async (req, res) =>{
    const idMed = req.params.MedicoId;
    try {
        await repository.delete(idMed);
        res.status(200).send({
            message:"Medico removido com sucesso"
        });
    
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar a requisição (ID)" + error,
            erro: error
        })
    }
}
exports.put = async (req,res) =>{
    const idMed = req.params.MedicoId;
    try {
        await repository.put({
            crm: req.body.crm,
            valorConsulta: req.body.valorConsulta,
            especialidade: req.body.especialidade,
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
            idMed
        });
        res.status(200).send({
            message: "Medico alterado com sucesso"
        });
    }catch (error) {
        res.status(500).send({
            message: "Falha na tentativa de alteração"
        })
    }
}


