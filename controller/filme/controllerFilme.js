/************************************************************************************
 * Objetivo: Controller responsável pela regra de negócio referente ao CRUD de Filme
 * Data: 11/02/2025
 * Autor: Giovanna
 * Versão: 1.0
************************************************************************************/

//Import do arquivo dee mensagens e status code do projeto
const message = require('../../modulo/config')

const filmeDAO = require('../../model/DAO/filme')
const filmeGeneroDAO = require('../../model/DAO/filme_genero.js')

//Import das controller necessárias para fazer os relacionamentos
const controllerFilmeGenero = require('../filme/controllerFilmeGenero')
const controllerClassificacao = require('../classificacao/controllerClassificacao.js')

//Funcão para tratar a inserção de um novo filme no DAO ok
const inserirFilme = async function (filme, contentType){
    console.log(filme)
    try{

        if(String(contentType).toLowerCase() == 'application/json')
        {
            if(filme.nome                  == '' || filme.nome             == undefined || filme.nome             == null || filme.nome.length             > 80 || 
                filme.nome                 == '' || filme.nome             == undefined || filme.nome             == null || filme.duracao.length          > 5  || 
                filme.sinopse              == '' || filme.sinopse          == undefined || filme.sinopse          == null ||
                filme.data_lancamento      == '' || filme.data_lancamento  == undefined || filme.data_lancamento  == null || filme.data_lancamento.length  > 10 ||
                filme.foto_capa.length     > 200 || filme.foto_capa        == undefined ||
                filme.link_trailer.length  > 200 || filme.link_trailer     == undefined ||
                filme.id_classificacao     == '' || filme.id_classificacao == undefined
            )
            {
                return message.ERROR_REQUIRED_FIELDS //400
            }else{
                //Chama a função para inserir no BD e aguarda o retorno da função
                let resultFilme = await filmeDAO.insertFilme(filme)

                if(resultFilme){
                    if (filme.genero && Array.isArray(filme.genero)) {
                        let filmeInserido = await filmeDAO.selectLastId()
                        let idFilme = filmeInserido[0].id

                        for (let genero of filme.genero) {
                            if (genero.id_genero && !isNaN(genero.id_genero)) {
                                let filmeGenero = {
                                    id_filme: idFilme,
                                    id_genero: genero.id_genero
                                }
                                await filmeGeneroDAO.insertFilmeGenero(filmeGenero)
                            }
                        }
                    }
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
//Funcão para tratar a atualização de um novo filme no DAO ok
const atualizarFilme = async function (id, filme, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
            {
                if(id                          == '' || id                     == undefined || id                     == null || isNaN(id)       ||id <=0           ||
                    filme.nome                 == '' || filme.nome             == undefined || filme.nome             == null || filme.nome.length             > 80 || 
                    filme.nome                 == '' || filme.nome             == undefined || filme.nome             == null || filme.duracao.length          > 5  || 
                    filme.sinopse              == '' || filme.sinopse          == undefined || filme.sinopse          == null ||
                    filme.data_lancamento      == '' || filme.data_lancamento  == undefined || filme.data_lancamento  == null || filme.data_lancamento.length  > 10 ||
                    filme.foto_capa.length     > 200 || filme.foto_capa        == undefined ||
                    filme.link_trailer.length  > 200 || filme.link_trailer     == undefined ||
                    filme.id_classificacao  == ''    || filme.id_classificacao == undefined
                )
                {
                    return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    //validação para verificar se o id existe no bd
                    let resultFilme = await filmeDAO.selectByIdFilme(parseInt(id))

                    if(resultFilme != false || typeof(resultFilme) == 'object'){
                        if(resultFilme.length > 0 ){
                            //add o id do filme no json com os dados
                            filme.id=parseInt(id)

                            let result = await filmeDAO.updateFilme(filme)
                            if(result){
                                return message.SUCCESS_UPDATED_ITEM //200
                            }else{
                                return message.ERROR_INTERNAL_SERVER_MODEL //500
                            }
                        }else{
                            return message.ERROR_NOT_FOUND //404
                        }
                    }else{
                        return message.ERROR_INTERNAL_SERVER_MODEL
                    }
                }
            }else{
                return message.ERROR_CONTENT_TYPE //415
            }
    }catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}
//Funcão para tratar a excluir de um novo filme no DAO ok
const excluirFilme = async function (idFilme){
    try {
        if(idFilme == '' || idFilme == undefined || idFilme == null || isNaN(idFilme) || idFilme <= 0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{

            //função que verifica se ID existe no BD
            let resultFilme = await filmeDAO.selectByIdFilme(parseInt(idFilme))

            if(resultFilme != false || typeof(resultFilme) == 'object'){
                //se exestir, faremos o delete
                if(resultFilme.length > 0){
                    //delete    
                    let result = await filmeDAO.deleteFilme(parseInt(idFilme))

                    if(result){
                        return message.SUCCESS_DELETED_ITEM
                    }else{
                        return message.ERROR_INTERNAL_SERVER_MODEL
                    }
                }else{
                    return message.ERROR_NOT_FOUND
                }
                
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}
//Funcão para tratar o retorno de filmes do DAO
const listarFilme = async function (){
    try {
        //Cria um objeto array para montar a nova estrutura de filmes no forEach
        let arrayFilmes = []

        //Objeto do tipo JSON
        let dadosFilme = {}

        //Chama a função para retornar os filmes cadastrados
        let resultFilme = await filmeDAO.selectAllFilme()
        
        if(resultFilme != false || typeof(resultFilme) == 'object'){
            if(resultFilme.length > 0){
                //Criando um JSON de retorno de dados para a API
                dadosFilme.status = true
                dadosFilme.status_code = 200
                dadosFilme.items = resultFilme.length

                //Percorrer o array de filmes para pegar cada ID de classificação
                // e descobrir quais os dados da classificação
                
                // resultFilme.forEach( async function(itemFilme){
                //Precisamos utilizar o for of, pois o foreach não consegue trabalhar com 
                // requisições async com await

                for(const itemFilme of resultFilme){
                    /* Monta o objeto da classificação para retornar no Filme (1XN) */
                        //Busca os dados da classificação na controller de classificacao
                        let dadosClassificacao = await controllerClassificacao.buscarClassificacao(itemFilme.id_classificacao)
                        //Adiciona um atributo classificação no JSON de filmes e coloca os dados da classificação
                        itemFilme.classificacao = dadosClassificacao.classificacao
                        //Remover um atributo do JSON
                        delete itemFilme.id_classificacao

                    /* Monta o objeto de Generos para retornar no Filme (Relação NxN) */
                        //encaminha o id do filme para a controller retornar os generos associados a esse filme
                        let dadosGenero = await controllerFilmeGenero.buscarGeneroPorFilme(itemFilme.id)
                        console.log(dadosGenero)
                        //Adiciona um atributo genero no JSON de filmes e coloca os dados do genero
                        itemFilme.genero = dadosGenero.genero

                    //Adiciona em um novo array o JSON de filmes com a sua nova estrutura de dados
                    arrayFilmes.push(itemFilme)
 
                }
                
                dadosFilme.films = arrayFilmes

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
        
/**/    let arrayFilmes = []

        if(idFilme == '' || idFilme == undefined || idFilme == null || isNaN(idFilme) || idFilme <= 0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            dadosFilme = {}
            let resultFilme = await filmeDAO.selectByIdFilme(parseInt(idFilme))
            if(resultFilme != false || typeof(resultFilme) == 'object'){
                if(resultFilme.length > 0){
                    //dados de retorno da API
                    dadosFilme.status = true
                    dadosFilme.status_code = 200
                    dadosFilme.films = resultFilme

    /**/
                    for(const itemFilme of resultFilme){
                        //Busca os dados da classificação na controller de classificacao
                        let dadosClassificacao = await controllerClassificacao.buscarClassificacao(itemFilme.id_classificacao)
                        
                        //Adiciona um atributo classificação no JSON de filmes e coloca os dados da classificação
                        itemFilme.classificacao = dadosClassificacao.classificacao
                        
                        //Remover um atributo do JSON
                        delete itemFilme.id_classificacao
                        
                        //Adiciona em um novo array o JSON de filmes com a sua nova estrutura de dados
                        arrayFilmes.push(itemFilme)
     
                    }

                    dadosFilme.films = arrayFilmes

    /**/

                    return dadosFilme
                }else{
                    return message.ERROR_NOT_FOUND //404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }
    }catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500

    }
}

module.exports = {
    inserirFilme,
    atualizarFilme,
    excluirFilme,
    listarFilme,
    buscarFilme
}