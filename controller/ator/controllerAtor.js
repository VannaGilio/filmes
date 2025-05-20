const atorDAO = require('../../model/DAO/ator.js')
const controllerSexo = require('../sexo/controllerSexo.js')
const message = require('../../modulo/config.js')

const inserirAtor = async function (ator, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (ator.nome == '' || ator.nome == undefined || ator.nome == null || ator.nome.length > 100 ||
                ator.idade == '' || ator.idade == undefined || ator.idade == null || ator.idade.length > 100 ||
                ator.id_sexo == '' || ator.id_sexo == undefined || ator.id_sexo == null || ator.id_sexo.length < 0
            ) {
                return message.ERROR_REQUIRED_FIELDS //400
            } else {
                let resultAtor = await atorDAO.insertAtor(ator)

                if (resultAtor) {
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
const atualizarAtor = async function (id, ator, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (ator.nome == '' || ator.nome == undefined || ator.nome == null || ator.nome.length > 100 ||
                ator.idade == '' || ator.idade == undefined || ator.idade == null || ator.idade.length > 100 ||
                ator.id_sexo == '' || ator.id_sexo == undefined || ator.id_sexo == null || ator.id_sexo.length < 0
            ) {
                return message.ERROR_REQUIRED_FIELDS //400
            } else {
                let resultAtor = await atorDAO.selectByIdAtor(parseInt(id))

                if (resultAtor != false || typeof (resultAtor) == 'object') {
                    if (resultAtor.length > 0) {
                        ator.id_sexo = parseInt(id)

                        let result = await atorDAO.updateAtor(ator)

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
const excluirAtor = async function (id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS //400
        } else {
            let resultAtor = await atorDAO.selectByIdAtor(parseInt(id))

            if (resultAtor != false || typeof (resultAtor) == 'object') {
                if (resultAtor.length > 0) {
                    let result = await atorDAO.deleteAtor(parseInt(id))

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
const listarAtor = async function () {
    try {
        let arrayFilmes = []
        let dadosAtor = {}
        let resultAtor = await atorDAO.selectAllAtor()

        if (resultAtor != false || typeof (resultAtor) == 'object') {
            if (resultAtor.length > 0) {

                dadosAtor.status = true
                dadosAtor.status_code = 200
                dadosAtor.items = resultAtor.length
                dadosAtor.sexo = resultAtor

                for (const itemFilme of resultAtor) {

                    let dadosSexo = await controllerSexo.buscarSexo(itemFilme.id_sexo)

                    itemFilme.sexo = dadosSexo.sexo
                    delete itemFilme.id_sexo

                    arrayFilmes.push(itemFilme)
                }
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
const buscarAtor = async function (id) {
    try {
        let arrayFilmes = []

        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS //400
        } else {
            dadosAtor = {}
            let resultAtor = await atorDAO.selectByIdAtor(id)
            if (resultAtor != false || typeof (resultAtor) == 'object') {
                if (resultAtor.length > 0) {
                    dadosAtor.status = true
                    dadosAtor.status_code = 200
                    dadosAtor.ator = resultAtor

                    for (const itemFilme of resultAtor) {

                        let dadosSexo = await controllerSexo.buscarSexo(itemFilme.id_sexo)

                        itemFilme.sexo = dadosSexo.sexo
                        delete itemFilme.id_sexo

                        arrayFilmes.push(itemFilme)
                    }

                    dadosAtor.films = arrayFilmes

                    return dadosAtor
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
    inserirAtor,
    atualizarAtor,
    excluirAtor,
    listarAtor,
    buscarAtor
}