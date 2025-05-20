const atorDAO = require('../../model/DAO/ator.js')
const nacionalidadeAtorDAO = require('../../model/DAO/nacionalidade/nacionalidade_ator.js')
const controllerSexo = require('../sexo/controllerSexo.js')
const controllerNacionalidadeAtor = require('../nacionalidade/controllerNacionalidadeAtor.js')
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
                    if (ator.nacionalidade && Array.isArray(ator.nacionalidade)) {
                        let atorInserido = await atorDAO.selectLastIdAtor()
                        let idAtor = atorInserido[0].id_ator

                        for (let nacionalidade of ator.nacionalidade) {
                            if (nacionalidade.id_nacionalidade && !isNaN(nacionalidade.id_nacionalidade)) {
                                let nacionalidadeAtor = {
                                    id_ator: idAtor,
                                    id_nacionalidade: nacionalidade.id_nacionalidade
                                }
                                await nacionalidadeAtorDAO.insertNacionalidadeAtor(nacionalidadeAtor)
                            }
                        }
                    }

                    return message.SUCCESS_CREATED_ITEM //201
                } else
                    return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        } else {
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        console.error(error)
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
                dadosAtor.ator = resultAtor

                for (const itemAtor of resultAtor) {

                    let dadosSexo = await controllerSexo.buscarSexo(itemAtor.id_sexo)
                    itemAtor.sexo = dadosSexo.sexo
                    delete itemAtor.id_sexo

                    let dadosNacionalidade = await controllerNacionalidadeAtor.buscarNacionalidadePorAtor(itemAtor.id_ator)
                    itemAtor.nacionalidade = dadosNacionalidade.nacionalidade

                    arrayFilmes.push(itemAtor)
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

                    for (const itemAtor of resultAtor) {

                        let dadosSexo = await controllerSexo.buscarSexo(itemAtor.id_sexo)
                        itemAtor.sexo = dadosSexo.sexo
                        delete itemAtor.id_sexo

                        let dadosNacionalidade = await controllerNacionalidadeAtor.buscarNacionalidadePorAtor(itemAtor.id_ator)
                        itemAtor.nacionalidade = dadosNacionalidade.nacionalidade

                        arrayFilmes.push(itemAtor)
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