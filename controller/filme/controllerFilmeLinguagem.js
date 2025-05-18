//Import do arquivo dee mensagens e status code do projeto
const message = require('../../modulo/config.js')

const filmeLinguagemDAO = require ('../../model/DAO/filme/filme_linguagem.js')

const inserirFilmeLinguagem = async function (filmeLinguagem, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (
                filmeLinguagem.id_filme == '' || filmeLinguagem.id_filme == undefined || filmeLinguagem.id_filme == null || isNaN(filmeLinguagem.id_filme) || filmeLinguagem.id_filme <= 0 ||
                filmeLinguagem.id_linguagem == '' || filmeLinguagem.id_linguagem == undefined || filmeLinguagem.id_linguagem == null || isNaN(filmeLinguagem.id_linguagem) || filmeLinguagem.id_linguagem <= 0
            ) {
                return message.ERROR_REQUIRED_FIELDS //400
            } else {
                //Chama a função para inserir no BD e aguarda o retorno da função
                let resultLinguagem = await filmeLinguagemDAO.insertFilmeLinguagem(filmeLinguagem)

                if (resultLinguagem)
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

const atualizarFilmeLinguagem = async function (id, filmeLinguagem, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0 ||
                filmeLinguagem.id_filme == '' || filmeLinguagem.id_filme == undefined || filmeLinguagem.id_filme == null || isNaN(filmeLinguagem.id_filme) || filmeLinguagem.id <= 0 ||
                filmeLinguagem.id_linguagem == '' || filmeLinguagem.id_linguagem == undefined || filmeLinguagem.id_linguagem == null || isNaN(filmeLinguagem.id_linguagem) || filmeLinguagem.id_linguagem <= 0
            ) {
                return message.ERROR_REQUIRED_FIELDS //400
            } else {
                //Validação para verificar se o ID existe no BD
                let resultLinguagem = await filmeLinguagemDAO.selectByIdFilmeLinguagem(parseInt(id))

                if (resultLinguagem != false || typeof (resultLinguagem) == 'object') {
                    if (resultLinguagem.length > 0) {
                        //Update
                        //Adiciona o ID do genero no JSON com os dados
                        linguagem.id_linguagem = parseInt(id)

                        let result = await filmeLinguagemDAO.updateFilmeLinguagem(filmeLinguagem)

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

const excluirFilmeLinguagem = async function (id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS //400
        } else {

            //Funcção que verifica se  ID existe no BD
            let resultLinguagem = await filmeLinguagemDAO.selectByIdFilmeLinguagem(parseInt(id))

            if (resultLinguagem != false || typeof (resultLinguagem) == 'object') {
                //Se existir, faremos o delete
                if (resultLinguagem.length > 0) {
                    //delete
                    let result = await filmeLinguagemDAO.deleteFilmeLinguagem(parseInt(id))

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

const listarFilmeLinguagem = async function () {
    try {
        //Objeto do tipo JSON
        let dadosLinguagem = {}
        //Chama a função para retornar os generos cadastrados
        let resultLinguagem = await filmeLinguagemDAO.selectAllFilmeLinguagem()

        if (resultLinguagem != false || typeof (resultLinguagem) == 'object') {
            if (resultLinguagem.length > 0) {
                //Criando um JSON de retorno de dados para a API
                dadosLinguagem.status = true
                dadosLinguagem.status_code = 200
                dadosLinguagem.items = resultLinguagem.length
                dadosLinguagem.films = resultLinguagem

                return dadosLinguagem
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

const buscarFilmeLinguagem = async function (id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS //400
        } else {
            let dadosLinguagem = {}

            let resultLinguagem = await filmeLinguagemDAO.selectByIdFilmeLinguagem(parseInt(id))

            if (resultLinguagem != false || typeof (resultLinguagem) == 'object') {
                if (resultLinguagem.length > 0) {
                    //Criando um JSON de retorno de dados para a API
                    dadosLinguagem.status = true
                    dadosLinguagem.status_code = 200
                    dadosLinguagem.linguagem = resultLinguagem

                    return dadosLinguagem //200
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

const buscarLinguagemPorFilme = async function (id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS //400
        } else {
            let dadosLinguagem = {}

            let resultLinguagem = await filmeLinguagemDAO.selectLinguagemByIdFilme(parseInt(id))

            if (resultLinguagem != false || typeof (resultLinguagem) == 'object') {
                if (resultLinguagem.length > 0) {
                    //Criando um JSON de retorno de dados para a API
                    dadosLinguagem.status = true
                    dadosLinguagem.status_code = 200
                    dadosLinguagem.linguagem = resultLinguagem

                    return dadosLinguagem //200
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

const buscarFilmePorLinguagem = async function (id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS //400
        } else {
            let dadosLinguagem = {}

            let resultLinguagem = await filmeLinguagemDAO.selectFilmeByIdLinguagem(parseInt(id))

            if (resultLinguagem != false || typeof (resultLinguagem) == 'object') {
                if (resultLinguagem.length > 0) {
                    //Criando um JSON de retorno de dados para a API
                    dadosLinguagem.status = true
                    dadosLinguagem.status_code = 200
                    dadosLinguagem.genero = resultFilme

                    return dadosLinguagem //201
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
    inserirFilmeLinguagem,
    atualizarFilmeLinguagem,
    excluirFilmeLinguagem,
    listarFilmeLinguagem,
    buscarFilmeLinguagem,
    buscarFilmePorLinguagem,
    buscarLinguagemPorFilme
}