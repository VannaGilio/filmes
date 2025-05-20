//Import do arquivo dee mensagens e status code do projeto
const message = require('../../modulo/config')

const nacionalidadeDAO = require('../../model/DAO/nacionalidade/nacionalidade.js')

const inserirNacionalidade = async function (nacionalidade, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (nacionalidade.nacionalidade == '' || nacionalidade.nacionalidade == undefined || nacionalidade.nacionalidade == null || nacionalidade.nacionalidade.length > 50
            ) {
                return message.ERROR_REQUIRED_FIELDS //400
            } else {
                //Chama a função para inserir no BD e aguarda o retorno da função
                let resultNacionalidade = await nacionalidadeDAO.insertNacionalidade(nacionalidade)

                if (resultNacionalidade) {
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

const atualizarNacionalidade = async function (id, nacionalidade, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0 ||
                nacionalidade.nacionalidade == '' || nacionalidade.nacionalidade == undefined || nacionalidade.nacionalidade == null || nacionalidade.nacionalidade.length > 50
            ) {
                return message.ERROR_REQUIRED_FIELDS //400
            } else {
                //validação para verificar se o id existe no bd
                let resultNacionalidade = await nacionalidadeDAO.selectByIdNacionalidade(parseInt(id))

                if (resultNacionalidade != false || typeof (resultNacionalidade) == 'object') {
                    if (resultNacionalidade.length > 0) {
                        //add o id do filme no json com os dados
                        nacionalidade.id_nacionalidade = parseInt(id)

                        let result = await nacionalidadeDAO.updateNacionalidade(nacionalidade)
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

const excluirNacionalidade = async function (id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS //400
        } else {

            //função que verifica se ID existe no BD
            let resultNacionalidade = await nacionalidadeDAO.selectAllNacionalidade(parseInt(id))

            if (resultNacionalidade != false || typeof (resultNacionalidade) == 'object') {
                //se exestir, faremos o delete
                if (resultNacionalidade.length > 0) {
                    //delete    
                    let result = await nacionalidadeDAO.deleteNacionalidade(parseInt(id))

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

const listarNacionalidade = async function () {
      try {
            //Objeto do tipo JSON
            let dadosNacionalidade = {}
    
            //Chama a função para retornar os filmes cadastrados
            let resultNacionalidade = await nacionalidadeDAO.selectAllNacionalidade()
            
            if(resultNacionalidade != false || typeof(resultNacionalidade) == 'object'){
                if(resultNacionalidade.length > 0){
                    //Criando um JSON de retorno de dados para a API
                    dadosNacionalidade.status = true
                    dadosNacionalidade.status_code = 200
                    dadosNacionalidade.items = resultNacionalidade.length
                    dadosNacionalidade.nacionalidade = resultNacionalidade
    
                    return dadosNacionalidade
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

const buscarNacionalidade = async function (id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS //400
        } else {
            dadosNacionalidade = {}
            let resultNacionalidade = await nacionalidadeDAO.selectByIdNacionalidade(id)
            if (resultNacionalidade != false || typeof (resultNacionalidade) == 'object') {
                if (resultNacionalidade.length > 0) {
                    dadosNacionalidade.status = true
                    dadosNacionalidade.status_code = 200
                    dadosNacionalidade.nacionalidade = resultNacionalidade

                    return dadosNacionalidade
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
    inserirNacionalidade,
    atualizarNacionalidade,
    excluirNacionalidade,
    listarNacionalidade,
    buscarNacionalidade
}