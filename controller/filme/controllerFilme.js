/************************************************************************************
 * Objetivo: Controller responsável pela regra de negócio referente ao CRUD de Filme
 * Data: 11/02/2025
 * Autor: Giovanna
 * Versão: 1.0
************************************************************************************/

//Import do arquivo dee mensagens e status code do projeto
const message = require('../../modulo/config')

const filmeDAO = require('../../model/DAO/filme')

//Funcão para tratar a inserção de um novo filme no DAO
const inserirFilme = async function (filme, contentType){
    try{

        if(String(contentType).toLowerCase() == 'application/json')
        {
            if(filme.nome                  == '' || filme.nome             == undefined || filme.nome             == null || filme.nome.length             > 80 || 
                filme.nome                 == '' || filme.nome             == undefined || filme.nome             == null || filme.duracao.length          > 5  || 
                filme.sinopse              == '' || filme.sinopse          == undefined || filme.sinopse          == null ||
                filme.data_lancamento      == '' || filme.data_lancamento  == undefined || filme.data_lancamento  == null || filme.data_lancamento.length  > 10 ||
                filme.foto_capa.length     > 200 || filme.foto_capa        == undefined ||
                filme.link_trailer.length  > 200 || filme.link_trailer     == undefined
            )
            {
                return message.ERROR_REQUIRED_FIELDS //400
            }else{
                //Chama a função para inserir no BD e aguarda o retorno da função
                let resultFilme = await filmeDAO.insertFilme(filme)
        
                if(resultFilme){
                    return message.SUCCESS_CREATED_ITEM //201
                }else
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }else{
            return message.ERROR_CONTENT_TYPE //415
        }
    }catch(error){
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
   
}
//Funcão para tratar a atualização de um novo filme no DAO
const atualizarFilme = async function (){
    
}

//Funcão para tratar a excluir de um novo filme no DAO
const excluirFilme = async function (){
    
}

//Funcão para tratar o retorno de filmes do DAO
const listarFilme = async function (){
    try {
        //Objeto do tipo JSON
        let dadosFilme = {}

        //Chama a função para retornar os filmes cadastrados
        let resultFilme = await filmeDAO.selectAllFilme()
        
        if(resultFilme != false){
            if(resultFilme.length > 0){
                //Criando um JSON de retorno de dados para a API
                dadosFilme.status = true
                dadosFilme.status_code = 200
                dadosFilme.items = resultFilme.length
                dadosFilme.films = resultFilme

                return dadosFilme
            }else{
                return message.ERROR_NOT_FOUND //404
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Funcão para tratar o retorno de um filme filtrando pelo id do DAO
const buscarFilme = async function (idFilme){
    try {

        let dadosFilme = {}

        if(idFilme.isInteger || idFilme == '' || idFilme == undefined || idFilme == null){
            return message.ERROR_REQUIRED_FIELDS
        }else{
            let resultFilme = await filmeDAO.selectByIdFilme()
            
            if(resultFilme){
                dadosFilme = {
                    status: true,
                    dadosFilme.status_code = 200,
                    dadosFilme.film = resultFilme
                }

                return dadosFilme
            }else{
                return message.ERROR_INTERNAL_SERVER
            }
        }
        

    }catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
    }

module.exports = {
    inserirFilme,
    atualizarFilme,
    excluirFilme,
    atualizarFilme,
    excluirFilme,
    listarFilme,
    buscarFilme
}