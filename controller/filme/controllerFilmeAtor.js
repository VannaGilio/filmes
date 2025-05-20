//Import do arquivo dee mensagens e status code do projeto
const message = require('../../modulo/config.js')

const filmeAtorDAO = require('../../model/DAO/filme/filme_ator.js')

const inserirFilmeAtor = async function (filmeAtor, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (
                filmeAtor.id_filme == '' || filmeAtor.id_filme == undefined || filmeAtor.id_filme == null || isNaN(filmeAtor.id_filme) || filmeAtor.id_filme <= 0 ||
                filmeAtor.id_ator == '' || filmeAtor.id_ator == undefined || filmeAtor.id_ator == null || isNaN(filmeAtor.id_ator) || filmeAtor.id_ator <= 0
            ) {
                return message.ERROR_REQUIRED_FIELDS //400
            } else {
                let resultAtor = await filmeAtorDAO.insertFilmeAtor(filmeAtor)

                if (resultAtor)
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
const atualizarFilmeAtor = async function (id, filmeGenero, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0 ||
                filmeGenero.id_filme == '' || filmeGenero.id_filme == undefined || filmeGenero.id_filme == null || isNaN(filmeGenero.id_filme) || filmeGenero.id <= 0 ||
                filmeGenero.id_ator == '' || filmeGenero.id_ator == undefined || filmeGenero.id_ator == null || isNaN(filmeGenero.id_ator) || filmeGenero.id_ator <= 0
            ) {
                return message.ERROR_REQUIRED_FIELDS //400
            } else {
                let resultAtor = await filmeAtorDAO.selectByIdFilmeAtor(parseInt(id))

                if (resultAtor != false || typeof (resultAtor) == 'object') {
                    if (resultAtor.length > 0) {

                        ator.id_ator = parseInt(id)

                        let result = await filmeAtorDAO.updateFilmeAtor(filmeGenero)

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
const excluirFilmeAtor = async function (id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS //400
        } else {
            let resultAtor = await filmeAtorDAO.selectByIdFilmeAtor(parseInt(id))

            if (resultAtor != false || typeof (resultAtor) == 'object') {
                if (resultAtor.length > 0) {

                    let result = await filmeAtorDAO.deleteFilmeAtor(parseInt(id))

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
const listarFilmeAtor = async function () {
    try {
        let dadosAtor = {}
        let resultAtor = await filmeAtorDAO.selectAllFilmeAtor()

        if (resultAtor != false || typeof (resultAtor) == 'object') {
            if (resultAtor.length > 0) {

                dadosAtor.status = true
                dadosAtor.status_code = 200
                dadosAtor.items = resultAtor.length
                dadosAtor.films = resultAtor

                return dadosAtor
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
const buscarFilmeAtor = async function (id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS //400
        } else {
            let dadosAtor = {}

            let resultAtor = await filmeAtorDAO.selectByIdFilmeAtor(parseInt(id))

            if (resultAtor != false || typeof (resultAtor) == 'object') {
                if (resultAtor.length > 0) {

                    dadosAtor.status = true
                    dadosAtor.status_code = 200
                    dadosAtor.ator = resultAtor

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
const buscarAtorPorFilme = async function (id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS //400
        } else {
            let dadosAtor = {}

            let resultAtor = await filmeAtorDAO.selectByIdFilmeAtor(parseInt(id))

            if (resultAtor != false || typeof (resultAtor) == 'object') {
                if (resultAtor.length > 0) {

                    dadosAtor.status = true
                    dadosAtor.status_code = 200
                    dadosAtor.ator = resultAtor

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
const buscarFilmePorAtor = async function (id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS //400
        } else {
            let dadosFilme = {}

            let resultAtor = await filmeAtorDAO.selectByIdFilmeAtor(parseInt(id))

            if (resultAtor != false || typeof (resultAtor) == 'object') {
                if (resultAtor.length > 0) {

                    dadosFilme.status = true
                    dadosFilme.status_code = 200
                    dadosFilme.ator = resultFilme

                    return dadosFilme //201
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
    inserirFilmeAtor,
    atualizarFilmeAtor,
    excluirFilmeAtor,
    listarFilmeAtor,
    buscarAtorPorFilme,
    buscarFilmeAtor,
    buscarFilmePorAtor
} 