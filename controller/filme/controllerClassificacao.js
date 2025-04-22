//Import do arquivo dee mensagens e status code do projeto
const message = require('../../modulo/config')

const classificacaoDAO = require('../../model/DAO/classificacao')

//Funcão para tratar a inserção de um novo filme no DAO
const inserirClassificacao = async function (classificacao, contentType) {
    try {

        if (String(contentType).toLowerCase() == 'application/json') {
            if (
                classificacao.faixa_etaria == '' || classificacao.faixa_etaria == undefined || classificacao.faixa_etaria == null || classificacao.faixa_etaria.length > 50 ||
                classificacao.link_icone_classificacao == '' || classificacao.link_icone_classificacao == undefined ||
                classificacao.link_icone_classificacao == null || classificacao.link_icone_classificacao.length > 200
            ) {
                return message.ERROR_REQUIRED_FIELDS //400
            } else {
                //Chama a função para inserir no BD e aguarda o retorno da função
                let resultClassificacao = await classificacaoDAO.insertClassificacao(classificacao)

                if (resultClassificacao) {
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

const atualizarClassificacao = async function (id, classificacao, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            if (
                id == '' || id == undefined || id == null || isNaN(id) || id <= 0 ||
                classificacao.link_icone_classificacao == '' || classificacao.link_icone_classificacao == undefined ||
                classificacao.link_icone_classificacao == null || classificacao.link_icone_classificacao.length > 200
            ) {
                return message.ERROR_REQUIRED_FIELDS // 400
            } else {
                let resultClassificacao = await classificacaoDAO.selectByIdClassificacao(parseInt(id))

                if (resultClassificacao && typeof resultClassificacao === 'object') {
                    classificacao.id_classificacao = parseInt(id)

                    let result = await classificacaoDAO.updateClassificacao(classificacao)
                    if (result) {
                        return message.SUCCESS_UPDATED_ITEM // 200
                    } else {
                        return message.ERROR_INTERNAL_SERVER_MODEL // 500
                    }
                } else {
                    return message.ERROR_NOT_FOUND // 404
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE // 415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}


const excluirClassificacao = async function (id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS //400
        } else {

            //função que verifica se ID existe no BD
            let resultClassificacao = await classificacaoDAO.selectByIdClassificacao(parseInt(id))

            if (resultClassificacao != false || typeof (resultClassificacao) == 'object') {
                //se exestir, faremos o delete
                if (resultClassificacao.length > 0) {
                    //delete    
                    let result = await classificacaoDAO.deleteClassificacao(parseInt(id))

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

const listarClassificacao = async function () {
    try {
        //Objeto do tipo JSON
        let dadosClassificacao = {}

        //Chama a função para retornar os filmes cadastrados
        let resultClassificacao = await classificacaoDAO.selectClassificacao()

        if (resultClassificacao != false || typeof (resultClassificacao) == 'object') {
            if (resultClassificacao.length > 0) {
                //Criando um JSON de retorno de dados para a API
                dadosClassificacao.status = true
                dadosClassificacao.status_code = 200
                dadosClassificacao.items = resultClassificacao.length
                dadosClassificacao.classificacao = resultClassificacao

                return dadosClassificacao
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

const buscarClassificacao = async function (id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS //400
        } else {
            dadosClassificacao = {}
            let resultClassificacao = await classificacaoDAO.selectByIdClassificacao(id)
            if (resultClassificacao != false || typeof (resultClassificacao) == 'object') {
                if (resultClassificacao.length > 0) {
                    dadosClassificacao.status = true
                    dadosClassificacao.status_code = 200
                    dadosClassificacao.classificacao = resultClassificacao

                    return dadosClassificacao
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
    inserirClassificacao,
    atualizarClassificacao,
    excluirClassificacao,
    listarClassificacao,
    buscarClassificacao
}