//Import do arquivo dee mensagens e status code do projeto
const message = require('../../modulo/config')

const tipoPremiacaoDAO = require('../../model/DAO/premiacao/tipoPremiacao.js')
const controllerPremiacao = require('../tipoPremiacao/controllerPremiacao.js')

const inserirTipoPremiacao = async function (tipoPremiacao, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (tipoPremiacao.tipo_premiacao == '' || tipoPremiacao.tipo_premiacao == undefined || tipoPremiacao.tipo_premiacao == null || tipoPremiacao.tipo_premiacao > 100 ||
                tipoPremiacao.id_premiacao == null || tipoPremiacao.id_premiacao == undefined || tipoPremiacao.id_premiacao < 0 || tipoPremiacao.id_premiacao == ""
            ) {
                return message.ERROR_REQUIRED_FIELDS //400
            } else {
                //Chama a função para inserir no BD e aguarda o retorno da função
                let resultTipoPremiacao = await tipoPremiacaoDAO.insertTipoPremiacao(tipoPremiacao)

                if (resultTipoPremiacao) {
                    return message.SUCCESS_CREATED_ITEM //201
                } else
                    return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        } else {
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const atualizarTipoPremiacao = async function (id, tipoPremiacao, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0 ||
                tipoPremiacao.tipo_premiacao == '' || tipoPremiacao.tipo_premiacao == undefined || tipoPremiacao.tipo_premiacao == null || tipoPremiacao.tipo_premiacao.length > 100 ||
                tipoPremiacao.id_premiacao == null || tipoPremiacao.id_premiacao == undefined || tipoPremiacao.id_premiacao < 0 || tipoPremiacao.id_premiacao == ""
            ) {
                return message.ERROR_REQUIRED_FIELDS //400
            } else {
                //validação para verificar se o id existe no bd
                let resultTipoPremiacao = await tipoPremiacaoDAO.selectByIdTipoPremiacao(parseInt(id))

                if (resultTipoPremiacao != false || typeof (resultTipoPremiacao) == 'object') {
                    if (resultTipoPremiacao.length > 0) {
                        //add o id do filme no json com os dados
                        tipoPremiacao.id_tipo_premiacao = parseInt(id)

                        let result = await tipoPremiacaoDAO.updateTipoPremiacao(tipoPremiacao)
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

const excluirTipoPremiacao = async function (id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS //400
        } else {

            //função que verifica se ID existe no BD
            let resultTipoPremiacao = await tipoPremiacaoDAO.selectByIdTipoPremiacao(parseInt(id))

            if (resultTipoPremiacao != false || typeof (resultTipoPremiacao) == 'object') {
                //se exestir, faremos o delete
                if (resultTipoPremiacao.length > 0) {
                    //delete    
                    let result = await tipoPremiacaoDAO.deleteTipoPremiacao(parseInt(id))

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

const listarTipoPremicao = async function () {
    try {
        //Objeto do tipo JSON
        let dadosTipoPremiacao = {}
        let arrayFilmes = []

        //Chama a função para retornar os filmes cadastrados
        let resultTipoPremiacao = await tipoPremiacaoDAO.selectAllTipoPremiacao()

        if (resultTipoPremiacao != false || typeof (resultTipoPremiacao) == 'object') {
            if (resultTipoPremiacao.length > 0) {
                //Criando um JSON de retorno de dados para a API
                dadosTipoPremiacao.status = true
                dadosTipoPremiacao.status_code = 200
                dadosTipoPremiacao.items = resultTipoPremiacao.length
                dadosTipoPremiacao.tipoPremiacao = resultTipoPremiacao

                for (const itemFilme of resultTipoPremiacao) {
                    let dadosPremiacao = await controllerPremiacao.buscarPremiacao(itemFilme.id_premiacao)
                    itemFilme.premiacao = dadosPremiacao.premiacao
                    delete itemFilme.id_premiacao
                }
                dadosTipoPremiacao.films = arrayFilmes
                
                return dadosTipoPremiacao
            } else {
                return message.ERROR_NOT_FOUND //404
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) {
        console.error(error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const buscarTipoPremiacao = async function (id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS //400
        } else {
            dadosTipoPremiacao = {}
            let resultTipoPremiacao = await tipoPremiacaoDAO.selectByIdTipoPremiacao(id)
            if (resultTipoPremiacao != false || typeof (resultTipoPremiacao) == 'object') {
                if (resultTipoPremiacao.length > 0) {
                    dadosTipoPremiacao.status = true
                    dadosTipoPremiacao.status_code = 200
                    dadosTipoPremiacao.tipoPremiacao = resultTipoPremiacao

                    return dadosTipoPremiacao
                } else {
                    return message.ERROR_NOT_FOUND //404
                }
            } else {
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }
    } catch (error) {
        console.log(error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500

    }
}

module.exports = {
    inserirTipoPremiacao,
    excluirTipoPremiacao,
    buscarTipoPremiacao,
    atualizarTipoPremiacao,
    listarTipoPremicao
}