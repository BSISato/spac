var Consulta = require("../app/models/consulta");
var mysql = require('mysql');
var repository = require('../repositories/consulta-repository');

exports.post = async (req, res) => {
    try {
        await repository.post({
           
            idcliente: req.body.idCliente,
            data: req.body.data,
            situacao: req.body.situacao,
            descricao: req.body.descricao,
            prontuario: req.body.prontuario

        });
        res.status(200).send({
            message: "Consulta cadastrada com sucesso"
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: "Falha ao processar a requisição",
        });
    }
}

exports.getById = async (req, res) => {
    const idCons = req.params.ConsultaId;
    try {
        var data = await repository.getById(idCons);

        res.status(200).send({
            message:"Consulta:",
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
            message:"Consultas:",
            data
        });
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar a requisição de consulta" + error,
            erro: error
        })
    }
}
exports.delete = async (req, res) =>{
    const idCons = req.params.ConsultaId;
    try {
        await repository.delete(idCons);
        res.status(200).send({
            message:"Consulta removida com sucesso"
        });
    
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar a requisição (ID)" + error,
            erro: error
        })
    }
}
exports.put = async (req,res) =>{
    const idCons = req.params.ConsultaId;
    try {
        await repository.put({
            
            idcliente: req.body.idCliente,
            data: req.body.data,
            situacao: req.body.situacao,
            descricao: req.body.descricao,
            prontuario: req.body.prontuario,
            idCons
        });
        res.status(200).send({
            message: "Consulta alterada com sucesso"
        });
    }catch (error) {
        res.status(500).send({
            message: "Falha na tentativa de alteração"
        })
    }
}


