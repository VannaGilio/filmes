//Import do arquivo dee mensagens e status code do projeto
const message = require('../../modulo/config.js')

const filmePlataformaDAO = require('../../model/DAO/filme/filme_plataforma.js')

const inserirFilmePlataforma = async function (filmePlataforma, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (
                filmePlataforma.id_filme == '' || filmePlataforma.id_filme == undefined || filmePlataforma.id_filme == null || isNaN(filmePlataforma.id_filme) || filmePlataforma.id_filme <= 0 ||
                filmePlataforma.id_plataforma == '' || filmePlataforma.id_plataforma == undefined || filmePlataforma.id_plataforma == null || isNaN(filmePlataforma.id_plataforma) || filmePlataforma.id_plataforma <= 0
            ) {
                return message.ERROR_REQUIRED_FIELDS //400
            } else {
                //Chama a função para inserir no BD e aguarda o retorno da função
                let resultPlataforma = await filmePlataformaDAO.insertFilmePlataforma(filmePlataforma)

                if (resultPlataforma)
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

const atualizarFilmePlataforma = async function (id, filmePlataforma, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0 ||
                filmePlataforma.id_filme == '' || filmePlataforma.id_filme == undefined || filmePlataforma.id_filme == null || isNaN(filmePlataforma.id_filme) || filmePlataforma.id <= 0 ||
                filmePlataforma.id_plataforma == '' || filmePlataforma.id_plataforma == undefined || filmePlataforma.id_plataforma == null || isNaN(filmePlataforma.id_plataforma) || filmePlataforma.id_plataforma <= 0
            ) {
                return message.ERROR_REQUIRED_FIELDS //400
            } else {
                //Validação para verificar se o ID existe no BD
                let resultPlataforma = await filmePlataformaDAO.selectByIdFilmePlataforma(parseInt(id))

                if (resultPlataforma != false || typeof (resultPlataforma) == 'object') {
                    if (resultPlataforma.length > 0) {
                        //Update
                        //Adiciona o ID do genero no JSON com os dados
                        plataforma.id_plataforma = parseInt(id)

                        let result = await filmePlataformaDAO.updateFilmePlataforma(filmePlataforma)

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
const excluirFilmePlataforma = async function (id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS //400
        } else {

            //Funcção que verifica se  ID existe no BD
            let resultPlataforma = await filmePlataformaDAO.selectByIdFilmePlataforma(parseInt(id))

            if (resultPlataforma != false || typeof (resultPlataforma) == 'object') {
                //Se existir, faremos o delete
                if (resultPlataforma.length > 0) {
                    //delete
                    let result = await filmePlataformaDAO.deleteFilmePlataforma(parseInt(id))

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

const listarFilmePlataforma = async function () {
    try {
        //Objeto do tipo JSON
        let dadosPlataforma = {}
        //Chama a função para retornar os generos cadastrados
        let resultPlataforma = await filmePlataformaDAO.selectAllFilmePlataforma()

        if (resultPlataforma != false || typeof (resultPlataforma) == 'object') {
            if (resultPlataforma.length > 0) {
                //Criando um JSON de retorno de dados para a API
                dadosPlataforma.status = true
                dadosPlataforma.status_code = 200
                dadosPlataforma.items = resultPlataforma.length
                dadosPlataforma.films = resultPlataforma

                return dadosPlataforma
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

const buscarFilmePlataforma = async function (id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS //400
        } else {
            let dadosPlataforma = {}

            let resultPlataforma = await filmePlataformaDAO.selectByIdFilmePlataforma(parseInt(id))

            if (resultPlataforma != false || typeof (resultPlataforma) == 'object') {
                if (resultPlataforma.length > 0) {
                    //Criando um JSON de retorno de dados para a API
                    dadosPlataforma.status = true
                    dadosPlataforma.status_code = 200
                    dadosPlataforma.plataforma = resultPlataforma

                    return dadosPlataforma //200
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

const buscarPlataformaPorFilme = async function (id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS //400
        } else {
            let dadosPlataforma = {}

            let resultPlataforma = await filmePlataformaDAO.selectPlataformaByIdFilme(parseInt(id))

            if (resultPlataforma != false || typeof (resultPlataforma) == 'object') {
                if (resultPlataforma.length > 0) {
                    //Criando um JSON de retorno de dados para a API
                    dadosPlataforma.status = true
                    dadosPlataforma.status_code = 200
                    dadosPlataforma.plataforma = resultPlataforma

                    return dadosPlataforma //200
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

const buscarFilmePorPlataforma = async function (id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS //400
        } else {
            let dadosFilme = {}

            let resultPlataforma = await filmePlataformaDAO.selectFilmeByIdPlataforma(parseInt(id))

            if (resultPlataforma != false || typeof (resultPlataforma) == 'object') {
                if (resultPlataforma.length > 0) {
                    //Criando um JSON de retorno de dados para a API
                    dadosFilme.status = true
                    dadosFilme.status_code = 200
                    dadosPlataforma.plataforma = resultPlataforma


                    return dadosFilme //200
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
    inserirFilmePlataforma,
    atualizarFilmePlataforma,
    excluirFilmePlataforma,
    listarFilmePlataforma,
    buscarFilmePlataforma,
    buscarFilmePorPlataforma,
    buscarPlataformaPorFilme
} 