//Import do arquivo dee mensagens e status code do projeto
const message = require('../../modulo/config.js')

const premiacaoDAO = require('../../model/DAO/premiacao/premiacao.js')

const inserirPremiacao = async function (premiacao, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (premiacao.nome_premiacao == '' || premiacao.nome_premiacao == undefined || premiacao.nome_premiacao == null || premiacao.nome_premiacao > 100
            ) {
                return message.ERROR_REQUIRED_FIELDS //400
            } else {
                //Chama a função para inserir no BD e aguarda o retorno da função
                let resultPremiacao = await premiacaoDAO.insertPremiacao(premiacao)

                if (resultPremiacao) {
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

const atualizarPremiacao = async function (id, premiacao, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0 ||
                premiacao.nome_premiacao == '' || premiacao.nome_premiacao == undefined || premiacao.nome_premiacao == null || premiacao.nome_premiacao.length > 100
            ) {
                return message.ERROR_REQUIRED_FIELDS //400
            } else {
                //validação para verificar se o id existe no bd
                let resultPremiacao = await premiacaoDAO.selectByIdPremiacao(parseInt(id))

                if (resultPremiacao != false || typeof (resultPremiacao) == 'object') {
                    if (resultPremiacao.length > 0) {
                        //add o id do filme no json com os dados
                        premiacao.id_premiacao = parseInt(id)

                        let result = await premiacaoDAO.updatePremiacao(premiacao)
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

const excluirPremiacao = async function (id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS //400
        } else {

            //função que verifica se ID existe no BD
            let resultPremiacao = await premiacaoDAO.selectByIdPremiacao(parseInt(id))

            if (resultPremiacao != false || typeof (resultPremiacao) == 'object') {
                //se exestir, faremos o delete
                if (resultPremiacao.length > 0) {
                    //delete    
                    let result = await premiacaoDAO.deletePremiacao(parseInt(id))

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

const listarPremicao = async function () {
      try {
            let dadosPremiacao = {}

            let resultPremiacao = await premiacaoDAO.selectAllPremiacao()
            
            if(resultPremiacao != false || typeof(resultPremiacao) == 'object'){
                if(resultPremiacao.length > 0){
                    //Criando um JSON de retorno de dados para a API
                    dadosPremiacao.status = true
                    dadosPremiacao.status_code = 200
                    dadosPremiacao.items = resultPremiacao.length
                    dadosPremiacao.premiacao = resultPremiacao
    
                    return dadosPremiacao
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

const buscarPremiacao = async function (id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS //400
        } else {
            dadosPremiacao = {}
            let resultPremiacao = await premiacaoDAO.selectByIdPremiacao(id)
            if (resultPremiacao != false || typeof (resultPremiacao) == 'object') {
                if (resultPremiacao.length > 0) {
                    dadosPremiacao.status = true
                    dadosPremiacao.status_code = 200
                    dadosPremiacao.premiacao = resultPremiacao

                    return dadosPremiacao
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
    inserirPremiacao,
    excluirPremiacao,
    buscarPremiacao,
    atualizarPremiacao,
    listarPremicao
}