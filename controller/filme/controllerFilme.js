/************************************************************************************
 * Objetivo: Controller responsável pela regra de negócio referente ao CRUD de Filme
 * Data: 11/02/2025
 * Autor: Giovanna
 * Versão: 1.0
************************************************************************************/

//Import do arquivo dee mensagens e status code do projeto
const message = require('../../modulo/config.js')

const filmeDAO = require('../../model/DAO/filme/filme.js')
const filmeGeneroDAO = require('../../model/DAO/filme/filme_genero.js')
const filmePlataformaDAO = require('../../model/DAO/filme/filme_plataforma.js')
const filmeLinguagemDAO = require('../../model/DAO/filme/filme_linguagem.js')
const filmeTipoPremiacaoDAO = require('../../model/DAO/filme/filme_tipo_premiacao.js')
const filmeAtorDAO = require('../../model/DAO/filme/filme_ator.js')

//Import das controller necessárias para fazer os relacionamentos
const controllerFilmeGenero = require('../filme/controllerFilmeGenero')
const controllerClassificacao = require('../classificacao/controllerClassificacao.js')
const controllerFilmePlataforma = require('../../controller/filme/controllerFilmePlataforma.js')
const controllerFilmeLinguagem = require('../../controller/filme/controllerFilmeLinguagem.js')
const controllerFilmeTipoPremiacao = require('../../controller/filme/controllerFilmeTipoPremiacao.js')
const controllerFilmeAtor = require('../../controller/filme/controllerFilmeAtor.js')

//Funcão para tratar a inserção de um novo filme no DAO ok
const inserirFilme = async function (filme, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (filme.nome == '' || filme.nome == undefined || filme.nome == null || filme.nome.length > 80 ||
                filme.nome == '' || filme.nome == undefined || filme.nome == null || filme.duracao.length > 5 ||
                filme.sinopse == '' || filme.sinopse == undefined || filme.sinopse == null ||
                filme.data_lancamento == '' || filme.data_lancamento == undefined || filme.data_lancamento == null || filme.data_lancamento.length > 10 ||
                filme.foto_capa.length > 200 || filme.foto_capa == undefined ||
                filme.link_trailer.length > 200 || filme.link_trailer == undefined ||
                filme.id_classificacao == '' || filme.id_classificacao == undefined || filme.id_classificacao == null || filme.id_classificacao < 0

            ) {
                return message.ERROR_REQUIRED_FIELDS //400
            } else {
                //Chama a função para inserir no BD e aguarda o retorno da função
                let resultFilme = await filmeDAO.insertFilme(filme)

                if (resultFilme) {
                    //Verificando se chega o filme.genero e se ele é um arrau
                    if (filme.genero && Array.isArray(filme.genero)) {
                        let filmeInserido = await filmeDAO.selectLastId() //Pegando o ultimo id inserido
                        let idFilme = filmeInserido[0].id //vendo se volta id

                        for (let genero of filme.genero) {
                            if (genero.id_genero && !isNaN(genero.id_genero)) {
                                let filmeGenero = {
                                    id_filme: idFilme,
                                    id_genero: genero.id_genero
                                }
                                await filmeGeneroDAO.insertFilmeGenero(filmeGenero)
                            }
                        }

                        if (filme.plataforma && Array.isArray(filme.plataforma)) {
                            let filmeInserido = await filmeDAO.selectLastId()
                            let idFilme = filmeInserido[0].id

                            for (let plataforma of filme.plataforma) {
                                if (plataforma.id_plataforma && !isNaN(plataforma.id_plataforma)) {
                                    let filmePlataforma = {
                                        id_filme: idFilme,
                                        id_plataforma: plataforma.id_plataforma
                                    }
                                    await filmePlataformaDAO.insertFilmePlataforma(filmePlataforma)
                                }
                            }
                        }

                        if (filme.linguagem && Array.isArray(filme.linguagem)) {
                            let filmeInserido = await filmeDAO.selectLastId()
                            let idFilme = filmeInserido[0].id

                            for (let linguagem of filme.linguagem) {
                                if (linguagem.id_linguagem && !isNaN(linguagem.id_linguagem)) {
                                    let filmeLinguagem = {
                                        id_filme: idFilme,
                                        id_linguagem: linguagem.id_linguagem
                                    }
                                    await filmeLinguagemDAO.insertFilmeLinguagem(filmeLinguagem)
                                }
                            }
                        }

                        if (filme.premiacao && Array.isArray(filme.premiacao)) {
                            let filmeInserido = await filmeDAO.selectLastId()
                            let idFilme = filmeInserido[0].id

                            for (let premiacao of filme.premiacao) {
                                if (premiacao.id_tipo_premiacao && !isNaN(premiacao.id_tipo_premiacao)) {
                                    let filmePremiacao = {
                                        id_filme: idFilme,
                                        id_tipo_premiacao: premiacao.id_tipo_premiacao
                                    }
                                    await filmeTipoPremiacaoDAO.insertFilmeTipoPremiacao(filmePremiacao)
                                }
                            }
                        }

                        if (filme.ator && Array.isArray(filme.ator)) {
                            let filmeInserido = await filmeDAO.selectLastId()
                            let idFilme = filmeInserido[0].id

                            for (let ator of filme.ator) {
                                if (ator.id_tipo_ator && !isNaN(ator.id_tipo_ator)) {
                                    let filmeAtor = {
                                        id_filme: idFilme,
                                        id_tipo_ator: ator.id_tipo_ator
                                    }
                                    await filmeAtorDAO.insertFilmeAtor(filmeAtor)
                                }
                            }
                        }

                        return message.SUCCESS_CREATED_ITEM //201
                    } else {
                        return message.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}
//Funcão para tratar a atualização de um novo filme no DAO ok
const atualizarFilme = async function (id, filme, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0 ||
                filme.nome == '' || filme.nome == undefined || filme.nome == null || filme.nome.length > 80 ||
                filme.nome == '' || filme.nome == undefined || filme.nome == null || filme.duracao.length > 5 ||
                filme.sinopse == '' || filme.sinopse == undefined || filme.sinopse == null ||
                filme.data_lancamento == '' || filme.data_lancamento == undefined || filme.data_lancamento == null || filme.data_lancamento.length > 10 ||
                filme.foto_capa.length > 200 || filme.foto_capa == undefined ||
                filme.link_trailer.length > 200 || filme.link_trailer == undefined ||
                filme.id_classificacao == '' || filme.id_classificacao == undefined
            ) {
                return message.ERROR_REQUIRED_FIELDS //400
            } else {
                //validação para verificar se o id existe no bd
                let resultFilme = await filmeDAO.selectByIdFilme(parseInt(id))

                if (resultFilme != false || typeof (resultFilme) == 'object') {
                    if (resultFilme.length > 0) {
                        //add o id do filme no json com os dados
                        filme.id = parseInt(id)

                        let result = await filmeDAO.updateFilme(filme)
                        if (result) {
                            return message.SUCCESS_UPDATED_ITEM //200
                        } else {
                            return message.ERROR_INTERNAL_SERVER_MODEL //500
                        }
                    } else {
                        return message.ERROR_NOT_FOUND //404
                    }
                } else {
                    return message.ERROR_INTERNAL_SERVER_MODEL
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}
//Funcão para tratar a excluir de um novo filme no DAO ok
const excluirFilme = async function (idFilme) {
    try {
        if (idFilme == '' || idFilme == undefined || idFilme == null || isNaN(idFilme) || idFilme <= 0) {
            return message.ERROR_REQUIRED_FIELDS //400
        } else {

            //função que verifica se ID existe no BD
            let resultFilme = await filmeDAO.selectByIdFilme(parseInt(idFilme))

            if (resultFilme != false || typeof (resultFilme) == 'object') {
                //se exestir, faremos o delete
                if (resultFilme.length > 0) {
                    //delete    
                    let result = await filmeDAO.deleteFilme(parseInt(idFilme))

                    if (result) {
                        return message.SUCCESS_DELETED_ITEM
                    } else {
                        return message.ERROR_INTERNAL_SERVER_MODEL
                    }
                } else {
                    return message.ERROR_NOT_FOUND
                }

            } else {
                return message.ERROR_INTERNAL_SERVER_MODEL
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}
//Funcão para tratar o retorno de filmes do DAO
const listarFilme = async function () {
    try {
        //Cria um objeto array para montar a nova estrutura de filmes no forEach
        let arrayFilmes = []

        //Objeto do tipo JSON
        let dadosFilme = {}

        //Chama a função para retornar os filmes cadastrados
        let resultFilme = await filmeDAO.selectAllFilme()

        if (resultFilme != false || typeof (resultFilme) == 'object') {
            if (resultFilme.length > 0) {
                //Criando um JSON de retorno de dados para a API
                dadosFilme.status = true
                dadosFilme.status_code = 200
                dadosFilme.items = resultFilme.length
                dadosFilme.films = resultFilme

                //Percorrer o array de filmes para pegar cada ID de classificação
                // e descobrir quais os dados da classificação

                //Precisamos utilizar o for of, pois o foreach não consegue trabalhar com 
                // requisições async com await

                for (const itemFilme of resultFilme) {
                    /* Monta o objeto da classificação para retornar no Filme (1XN) */
                    //Busca os dados da classificação na controller de classificacao
                    let dadosClassificacao = await controllerClassificacao.buscarClassificacao(itemFilme.id_classificacao)
                    //Adiciona um atributo classificação no JSON de filmes e coloca os dados da classificação
                    itemFilme.classificacao = dadosClassificacao.classificacao
                    //Remover um atributo do JSON
                    delete itemFilme.id_classificacao

                    //n/n
                    let dadosGenero = await controllerFilmeGenero.buscarGeneroPorFilme(itemFilme.id)
                    itemFilme.genero = dadosGenero.genero
                    //delete itemFilme.id_genero

                    let dadosPlataforma = await controllerFilmePlataforma.buscarPlataformaPorFilme(itemFilme.id)
                    itemFilme.plataforma = dadosPlataforma.plataforma

                    let dadosLinguagem = await controllerFilmeLinguagem.buscarLinguagemPorFilme(itemFilme.id)
                    itemFilme.linguagem = dadosLinguagem.linguagem

                    let dadosPremiacao = await controllerFilmeTipoPremiacao.buscarTipoPremiacaoPorFilme(itemFilme.id)
                    itemFilme.premiacao = dadosPremiacao.premiacao

                    let dadosAtor = await controllerFilmeAtor.buscarAtorPorFilme(itemFilme.id)
                    itemFilme.ator = dadosAtor.ator

                    //Adiciona em um novo array o JSON de filmes com a sua nova estrutura de dados
                    arrayFilmes.push(itemFilme)
                    //console.log(itemFilme)
                }

                dadosFilme.films = arrayFilmes

                return dadosFilme

            } else {
                return message.ERROR_NOT_FOUND //404
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}
//Funcão para tratar o retorno de um filme filtrando pelo id do DAO
const buscarFilme = async function (idFilme) {
    try {

        let arrayFilmes = []

        if (idFilme == '' || idFilme == undefined || idFilme == null || isNaN(idFilme) || idFilme <= 0) {
            return message.ERROR_REQUIRED_FIELDS //400
        } else {
            dadosFilme = {}
            let resultFilme = await filmeDAO.selectByIdFilme(parseInt(idFilme))
            if (resultFilme != false || typeof (resultFilme) == 'object') {
                if (resultFilme.length > 0) {
                    //dados de retorno da API
                    dadosFilme.status = true
                    dadosFilme.status_code = 200
                    dadosFilme.films = resultFilme

                    for (const itemFilme of resultFilme) {
                        //Busca os dados da classificação na controller de classificacao
                        let dadosClassificacao = await controllerClassificacao.buscarClassificacao(itemFilme.id_classificacao)
                        //Adiciona um atributo classificação no JSON de filmes e coloca os dados da classificação
                        itemFilme.classificacao = dadosClassificacao.classificacao
                        delete itemFilme.id_classificacao

                        let dadosGenero = await controllerFilmeGenero.buscarGeneroPorFilme(itemFilme.id)
                        itemFilme.genero = dadosGenero.genero

                        let dadosPlataforma = await controllerFilmePlataforma.buscarPlataformaPorFilme(itemFilme.id)
                        itemFilme.plataforma = dadosPlataforma.plataforma

                        let dadosLinguagem = await controllerFilmeLinguagem.buscarLinguagemPorFilme(itemFilme.id)
                        itemFilme.linguagem = dadosLinguagem.linguagem

                        let dadosPremiacao = await controllerFilmeTipoPremiacao.buscarTipoPremiacaoPorFilme(itemFilme.id)
                        itemFilme.premiacao = dadosPremiacao.premiacao

                        let dadosAtor = await controllerFilmeAtor.buscarAtorPorFilme(itemFilme.id)
                        itemFilme.ator = dadosAtor.ator

                        //Adiciona em um novo array o JSON de filmes com a sua nova estrutura de dados
                        arrayFilmes.push(itemFilme)
                    }

                    dadosFilme.films = arrayFilmes

                    return dadosFilme
                } else {
                    return message.ERROR_NOT_FOUND //404
                }
            } else {
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }
    } catch (error) {
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