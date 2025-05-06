//Import do arquivo dee mensagens e status code do projeto
const message = require('../../modulo/config')

const generoDAO = require('../../model/DAO/genero')

const inserirGenero = async function (genero, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (genero.genero == '' || genero.genero == undefined || genero.genero == null || genero.genero.length > 50
            ) {
                return message.ERROR_REQUIRED_FIELDS //400
            } else {
                //Chama a função para inserir no BD e aguarda o retorno da função
                let resultGenero = await generoDAO.insertGenero(genero)

                if (resultGenero) {
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

const atualizarGenero = async function (id, contentType, genero) {
    try {
        if (String(contentType) == 'application/json') {
            if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0 ||
                genero.genero == '' || genero.genero == undefined || genero.genero == null
            ) {
                return message.ERROR_REQUIRED_FIELDS //400
            } else {

                let resultGenero = await generoDAO.selectByIdGenero(parseInt(id))

                if (resultGenero != false || typeof (resultGenero) == 'object') {
                    if (resultGenero.length > 0) {
                        genero.id_genero = parseInt(id)

                        let result = await generoDAO.updateGenero(genero)
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

const excluirGenero = async function (id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS //400
        } else {

            //função que verifica se ID existe no BD
            let resultGenero = await generoDAO.selectByIdGenero(parseInt(id))

            if (resultGenero != false || typeof (resultGenero) == 'object') {
                //se exestir, faremos o delete
                if (resultGenero.length > 0) {
                    //delete    
                    let result = await generoDAO.deleteGenero(parseInt(id))

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

const listarGenero = async function () {
    try {
        //Objeto do tipo JSON
        let dadosGenero = {}

        let resultGenero = await generoDAO.selectAllGenero()

        if (resultGenero != false || typeof (resultGenero) == 'object') {
            if (resultGenero.length > 0) {
                //Criando um JSON de retorno de dados para a API
                dadosGenero.status = true
                dadosGenero.status_code = 200
                dadosGenero.items = resultGenero.length
                dadosGenero.genero = resultGenero

                return dadosGenero
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

const buscarGenero = async function (id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS //400
        } else {
            dadosGenero = {}
            let retultGenero = await generoDAO.selectByIdGenero(id)
            if (retultGenero != false || typeof (retultGenero) == 'object') {
                if (retultGenero.length > 0) {
                    dadosGenero.status = true
                    dadosGenero.status_code = 200
                    dadosGenero.genero = retultGenero

                    return dadosGenero
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
    inserirGenero,
    atualizarGenero,
    excluirGenero,
    listarGenero,
    buscarGenero
}