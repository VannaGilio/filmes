//Import do arquivo dee mensagens e status code do projeto
const message = require('../../modulo/config.js')

const nacionalidadeAtorDAO = require('../../model/DAO/nacionalidade/nacionalidade_ator.js')

const inserirNacionalidadeAtor = async function (nacionalidadeAtor, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (
                nacionalidadeAtor.id_ator == '' || nacionalidadeAtor.id_ator == undefined || nacionalidadeAtor.id_ator == null || isNaN(nacionalidadeAtor.id_ator) || nacionalidadeAtor.id_ator <= 0 ||
                nacionalidadeAtor.id_nacionalidade == '' || nacionalidadeAtor.id_nacionalidade == undefined || nacionalidadeAtor.id_nacionalidade == null || isNaN(nacionalidadeAtor.id_nacionalidade) || nacionalidadeAtor.id_nacionalidade <= 0
            ) {
                return message.ERROR_REQUIRED_FIELDS //400
            } else {
                //Chama a função para inserir no BD e aguarda o retorno da função
                let resultNacionalidadeAtor = await nacionalidadeAtorDAO.insertNacionalidadeAtor(nacionalidadeAtor)

                if (resultNacionalidadeAtor)
                    return message.SUCCESS_CREATED_ITEM //201
                else
                    return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        } else {
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const atualizarNacionalidadeAtor = async function (id, nacionalidadeAtor, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0 ||
                nacionalidadeAtor.id_ator == '' || nacionalidadeAtor.id_ator == undefined || nacionalidadeAtor.id_ator == null || isNaN(nacionalidadeAtor.id_ator) || nacionalidadeAtor.id_ator <= 0 ||
                nacionalidadeAtor.id_nacionalidade == '' || nacionalidadeAtor.id_nacionalidade == undefined || nacionalidadeAtor.id_nacionalidade == null || isNaN(nacionalidadeAtor.id_nacionalidade) || nacionalidadeAtor.id_nacionalidade <= 0
            ) {
                return message.ERROR_REQUIRED_FIELDS //400
            } else {
                //Validação para verificar se o ID existe no BD
                let resultNacionalidadeAtor = await nacionalidadeAtorDAO.selectByIdNacionalidadeAtor(parseInt(id))

                if (resultNacionalidadeAtor != false || typeof (resultNacionalidadeAtor) == 'object') {
                    if (resultNacionalidadeAtor.length > 0) {
                        
                        //plataforma.id_plataforma = parseInt(id) //OQUE ESSA LINHA FAZ?

                        let result = await nacionalidadeAtorDAO.updateNacionalidadeAtor(nacionalidadeAtor)

                        if (result) {
                            return message.SUCCESS_UPDATED_ITEM //200
                        } else {
                            return message.ERROR_INTERNAL_SERVER_MODEL //500
                        }
                    } else {
                        return message.ERROR_NOT_FOUND //404
                    }
                } else {
                    return message.ERROR_INTERNAL_SERVER_MODEL //500
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}
const excluirNacionalidadeAtor = async function (id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS //400
        } else {
            let resultNacionalidadeAtor = await nacionalidadeAtorDAO.selectByIdNacionalidadeAtor(parseInt(id))

            if (resultNacionalidadeAtor != false || typeof (resultNacionalidadeAtor) == 'object') {
                if (resultNacionalidadeAtor.length > 0) {
                    let result = await nacionalidadeAtorDAO.deleteNacionalidadeAtor(parseInt(id))

                    if (result) {
                        return message.SUCCESS_DELETED_ITEM //200
                    } else {
                        return message.ERROR_INTERNAL_SERVER_MODEL //500
                    }
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

const listarNacionalidadeAtor = async function () {
    try {
        let dadosNacionalidadeAtor = {}
        let resultNacionalidadeAtor = await nacionalidadeAtorDAO.selectAllNacionalidadeAtor()

        if (resultNacionalidadeAtor != false || typeof (resultNacionalidadeAtor) == 'object') {
            if (resultNacionalidadeAtor.length > 0) {

                dadosNacionalidadeAtor.status = true
                dadosNacionalidadeAtor.status_code = 200
                dadosNacionalidadeAtor.items = resultNacionalidadeAtor.length
                dadosNacionalidadeAtor.films = resultNacionalidadeAtor

                return dadosNacionalidadeAtor
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

const buscarNacionalidadeAtor = async function (id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS //400
        } else {
            let dadosNacionalidadeAtor = {}

            let resultNacionalidadeAtor = await filmePlataformaDAO.selectByIdFilmePlataforma(parseInt(id))

            if (resultNacionalidadeAtor != false || typeof (resultNacionalidadeAtor) == 'object') {
                if (resultNacionalidadeAtor.length > 0) {

                    dadosNacionalidadeAtor.status = true
                    dadosNacionalidadeAtor.status_code = 200
                    dadosNacionalidadeAtor.nacionalidade = resultNacionalidadeAtor

                    return dadosNacionalidadeAtor //200
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

const buscarNacionalidadePorAtor = async function (id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS //400
        } else {
            let dadosNacionalidadeAtor = {}

            let resultNacionalidadeAtor = await nacionalidadeAtorDAO.selectNacionalidadeByIdAtor(parseInt(id))

            if (resultNacionalidadeAtor != false || typeof (resultNacionalidadeAtor) == 'object') {
                if (resultNacionalidadeAtor.length > 0) {

                    dadosNacionalidadeAtor.status = true
                    dadosNacionalidadeAtor.status_code = 200
                    dadosNacionalidadeAtor.nacionalidade = resultNacionalidadeAtor

                    return dadosNacionalidadeAtor //200
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

const buscarAtorPorNacionalidade = async function (id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS //400
        } else {
            let dadosAtor = {}

            let resultNacionalidadeAtor = await nacionalidadeAtorDAO.selectAtorByIdNacionalidade(parseInt(id))

            if (resultNacionalidadeAtor != false || typeof (resultNacionalidadeAtor) == 'object') {
                if (resultNacionalidadeAtor.length > 0) {

                    dadosAtor.status = true
                    dadosAtor.status_code = 200
                    dadosPlataforma.nacionalidade = resultNacionalidadeAtor

                    return dadosAtor //200
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
    inserirNacionalidadeAtor,
    atualizarNacionalidadeAtor,
    excluirNacionalidadeAtor,
    listarNacionalidadeAtor,
    buscarAtorPorNacionalidade,
    buscarNacionalidadeAtor,
    buscarNacionalidadePorAtor
} 