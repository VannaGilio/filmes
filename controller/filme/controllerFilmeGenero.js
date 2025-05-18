//Import do arquivo dee mensagens e status code do projeto
const message = require('../../modulo/config.js')

const filmeGeneroDAO = require('../../model/DAO/filme/filme_genero.js')

const inserirFilmeGenero = async function (filmeGenero, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (
                filmeGenero.id_filme == '' || filmeGenero.id_filme == undefined || filmeGenero.id_filme == null || isNaN(filmeGenero.id_filme) || filmeGenero.id_filme <= 0 ||
                filmeGenero.id_genero == '' || filmeGenero.id_genero == undefined || filmeGenero.id_genero == null || isNaN(filmeGenero.id_genero) || filmeGenero.id_genero <= 0
            ) {
                return message.ERROR_REQUIRED_FIELDS //400
            } else {
                //Chama a função para inserir no BD e aguarda o retorno da função
                let resultgenero = await filmeGeneroDAO.insertFilmeGenero(filmeGenero)

                if (resultgenero)
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

const atualizarFilmeGenero = async function (id, filmeGenero, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0 ||
                filmeGenero.id_filme == '' || filmeGenero.id_filme == undefined || filmeGenero.id_filme == null || isNaN(filmeGenero.iid_filmed) || filmeGenero.id <= 0 ||
                filmeGenero.id_genero == '' || filmeGenero.id_genero == undefined || filmeGenero.id_genero == null || isNaN(filmeGenero.id_genero) || filmeGenero.id_genero <= 0
            ) {
                return message.ERROR_REQUIRED_FIELDS //400
            } else {
                //Validação para verificar se o ID existe no BD
                let resultgenero = await filmeGeneroDAO.selectByIdFilmeGenero(parseInt(id))

                if (resultgenero != false || typeof (resultgenero) == 'object') {
                    if (resultgenero.length > 0) {
                        //Update
                        //Adiciona o ID do genero no JSON com os dados
                        genero.id_genero = parseInt(id)

                        let result = await filmeGeneroDAO.updateGenero(filmeGenero)

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
const excluirFilmeGenero = async function (id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS //400
        } else {

            //Funcção que verifica se  ID existe no BD
            let resultgenero = await filmeGeneroDAO.selectByIdFilmeGenero(parseInt(id))

            if (resultgenero != false || typeof (resultgenero) == 'object') {
                //Se existir, faremos o delete
                if (resultgenero.length > 0) {
                    //delete
                    let result = await filmeGeneroDAO.deleteFilmeGenero(parseInt(id))

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

const listarFilmeGenero = async function () {
    try {
        //Objeto do tipo JSON
        let dadosgenero = {}
        //Chama a função para retornar os generos cadastrados
        let resultgenero = await filmeGeneroDAO.selectAllFilmeGenero()

        if (resultgenero != false || typeof (resultgenero) == 'object') {
            if (resultgenero.length > 0) {
                //Criando um JSON de retorno de dados para a API
                dadosgenero.status = true
                dadosgenero.status_code = 200
                dadosgenero.items = resultgenero.length
                dadosgenero.films = resultgenero

                return dadosgenero
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

const buscarFilmeGenero = async function (id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS //400
        } else {
            dadosgenero = {}

            let resultgenero = await filmeGeneroDAO.selectByIdFilmeGenero(parseInt(id))

            if (resultgenero != false || typeof (resultgenero) == 'object') {
                if (resultgenero.length > 0) {
                    //Criando um JSON de retorno de dados para a API
                    dadosgenero.status = true
                    dadosgenero.status_code = 200
                    dadosgenero.genero = resultgenero

                    return dadosgenero //200
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

const buscarGeneroPorFilme = async function (id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS //400
        } else {
            dadosgenero = {}

            let resultgenero = await filmeGeneroDAO.selectGeneroByIdFilme(parseInt(id))

            if (resultgenero != false || typeof (resultgenero) == 'object') {
                if (resultgenero.length > 0) {
                    //Criando um JSON de retorno de dados para a API
                    dadosgenero.status = true
                    dadosgenero.status_code = 200
                    dadosgenero.genero = resultgenero

                    return dadosgenero //200
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

const buscarFilmePorGenero = async function (id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS //400
        } else {
            dadosFilme = {}

            let resultgenero = await filmeGeneroDAO.selectFilmeByIdGenero(parseInt(id))

            if (resultgenero != false || typeof (resultgenero) == 'object') {
                if (resultgenero.length > 0) {
                    //Criando um JSON de retorno de dados para a API
                    dadosFilme.status = true
                    dadosFilme.status_code = 200
                    dadosFilme.genero = resultFilme

                    return dadosgenero //200
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
    inserirFilmeGenero,
    atualizarFilmeGenero,
    excluirFilmeGenero,
    listarFilmeGenero,
    buscarFilmeGenero,
    buscarGeneroPorFilme,
    buscarFilmePorGenero
} 