//Import do arquivo dee mensagens e status code do projeto
const message = require('../../modulo/config.js')

const filmeTipoPremiacaoDAO = require('../../model/DAO/filme/filme_tipo_premiacao.js')

const inserirFilmeTipoPremiacao = async function (filmeTipoPremiacao, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (
                filmeTipoPremiacao.id_filme == '' || filmeTipoPremiacao.id_filme == undefined || filmeTipoPremiacao.id_filme == null || isNaN(filmeTipoPremiacao.id_filme) || filmeTipoPremiacao.id_filme <= 0 ||
                filmeTipoPremiacao.id_tipo_premiacao == '' || filmeTipoPremiacao.id_tipo_premiacao == undefined || filmeTipoPremiacao.id_tipo_premiacao == null ||
                isNaN(filmeTipoPremiacao.id_tipo_premiacao) || filmeTipoPremiacao.id_tipo_premiacao <= 0
            ) {
                return message.ERROR_REQUIRED_FIELDS //400
            } else {
                //Chama a função para inserir no BD e aguarda o retorno da função
                let retultTipoPremiacao = await filmeTipoPremiacaoDAO.insertFilmeTipoPremiacao(filmeTipoPremiacao)

                if (retultTipoPremiacao)
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

const atualizarFilmeTipoPremiacao = async function (id, filmeTipoPremiacao, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0 ||
                filmeTipoPremiacao.id_filme == '' || filmeTipoPremiacao.id_filme == undefined || filmeTipoPremiacao.id_filme == null || isNaN(filmeTipoPremiacao.id_filme) || filmeTipoPremiacao.id <= 0 ||
                filmeTipoPremiacao.id_tipo_premiacao == '' || filmeTipoPremiacao.id_tipo_premiacao == undefined || filmeTipoPremiacao.id_tipo_premiacao == null ||
                isNaN(filmeTipoPremiacao.id_tipo_premiacao) || filmeTipoPremiacao.id_tipo_premiacao <= 0
            ) {
                return message.ERROR_REQUIRED_FIELDS //400
            } else {
                //Validação para verificar se o ID existe no BD
                let resultTipoPremicao = await filmeTipoPremiacaoDAO.selectByIdFilmeTipoPremiacao(parseInt(id))

                if (resultTipoPremicao != false || typeof (resultTipoPremicao) == 'object') {
                    if (resultTipoPremicao.length > 0) {
                        //Update
                        //Adiciona o ID do genero no JSON com os dados
                        tipo_premiacao.id_tipo_premiacao = parseInt(id)

                        let result = await filmeTipoPremiacaoDAO.updateFilmeTipoPremiacao(filmeTipoPremiacao)

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
const excluirFilmeTipoPremiacao = async function (id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS //400
        } else {

            //Funcção que verifica se  ID existe no BD
            let resultTipoPremiacao = await filmeTipoPremiacaoDAO.selectByIdFilmeTipoPremiacao(parseInt(id))

            if (resultTipoPremiacao != false || typeof (resultTipoPremiacao) == 'object') {
                //Se existir, faremos o delete
                if (resultTipoPremiacao.length > 0) {
                    //delete
                    let result = await filmeTipoPremiacaoDAO.deleteFilmeTipoPremiacao(parseInt(id))

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

const listarFilmeTipoPremiacao = async function () {
    try {
        let dadosPremiacao = {}
        let resultPremiacao = await filmeTipoPremiacaoDAO.selectAllFilmeTipoPremiacao()

        if (resultPremiacao != false || typeof (resultPremiacao) == 'object') {
            if (resultPremiacao.length > 0) {

                dadosPremiacao.status = true
                dadosPremiacao.status_code = 200
                dadosPremiacao.items = resultPremiacao.length
                dadosPremiacao.films = resultPremiacao

                return dadosPremiacao
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

const buscarFilmeTipoPremiacao = async function (id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS //400
        } else {
            let dadosTipoPremiacao = {}

            let resultTipoPremiacao = await filmeTipoPremiacaoDAO.selectByIdFilmeTipoPremiacao(parseInt(id))

            if (resultTipoPremiacao != false || typeof (resultTipoPremiacao) == 'object') {
                if (resultTipoPremiacao.length > 0) {

                    dadosTipoPremiacao.status = true
                    dadosTipoPremiacao.status_code = 200
                    dadosTipoPremiacao.tipoPremiacao = resultTipoPremiacao

                    return dadosTipoPremiacao //200
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

const buscarTipoPremiacaoPorFilme = async function (id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS //400
        } else {
            let dadosPremiacao = {}

            let resultPremiacao = await filmeTipoPremiacaoDAO.selectTipoPremiacaoByIdFilme(parseInt(id))

            if (resultPremiacao != false || typeof (resultPremiacao) == 'object') {
                if (resultPremiacao.length > 0) {
                    //Criando um JSON de retorno de dados para a API
                    dadosPremiacao.status = true
                    dadosPremiacao.status_code = 200
                    dadosPremiacao.premiacao = resultPremiacao

                    return dadosPremiacao //200
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

const buscarFilmePorTipoPremiacao = async function (id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS //400
        } else {
            let dadosFilme = {}

            let resultTipoPremiacao = await filmeTipoPremiacaoDAO.selectFilmeByIdTipoPremiacao(parseInt(id))

            if (resultTipoPremiacao != false || typeof (resultTipoPremiacao) == 'object') {
                if (resultTipoPremiacao.length > 0) {
                    //Criando um JSON de retorno de dados para a API
                    dadosFilme.status = true
                    dadosFilme.status_code = 200
                    dadosFilme.tipoPremiacao = resultTipoPremiacao

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
    inserirFilmeTipoPremiacao,
    atualizarFilmeTipoPremiacao,
    excluirFilmeTipoPremiacao,
    listarFilmeTipoPremiacao,
    buscarFilmeTipoPremiacao,
    buscarTipoPremiacaoPorFilme,
    buscarFilmePorTipoPremiacao
} 