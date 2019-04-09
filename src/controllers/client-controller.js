var Cliente = require("../app/models/client");
var mysql = require('mysql');
var repository = require('../repositories/client-repository');

exports.post = async (req, res) => {
    try {
        await repository.post({
            convenioMedico: req.body.convenioMedico,
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
    const idCli = req.params.ClientId;
    try {
        var data = await repository.getById(idCli);

        res.status(200).send({
        
           message:"Cliente:",
           dado:data
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
            message: 'Clientes',
            dados:data
        });
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar a requisição de clientes" + error,
            erro: error
        })
    }
}
exports.delete = async (req, res) =>{
    const idCli = req.params.ClientId;
    try {
        await repository.delete(idCli);
        res.status(200).send({
            message:"Cliente removido com sucesso"
        });
    
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar a requisição (ID)" + error,
            erro: error
        })
    }
}
exports.put = async (req,res) =>{
    const idCli = req.params.ClientId;
    try {
        await repository.put({
            convenioMedico: req.body.convenioMedico,
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
            uf: req.body.uf,
            idCli
        });
        res.status(200).send({
            message: "Cliente alterado com sucesso"
        });
    }catch (error) {
        res.status(500).send({
            message: "Falha na tentativa de alteração"
        })
    }
}


