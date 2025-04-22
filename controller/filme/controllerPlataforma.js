//Import do arquivo dee mensagens e status code do projeto
const message = require('../../modulo/config')

const plataformaDAO = require('../../model/DAO/plataforma')

const inserirPlataforma = async function (plataforma, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (plataforma.plataforma == '' || plataforma.plataforma == undefined || plataforma.plataforma == null || plataforma.plataforma.length > 50
            ) {
                return message.ERROR_REQUIRED_FIELDS //400
            } else {
                //Chama a função para inserir no BD e aguarda o retorno da função
                let resultPlataforma = await plataformaDAO.insertPlataforma(plataforma)

                if (resultPlataforma) {
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

const atualizarPlataforma = async function (id, plataforma, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0 ||
                plataforma.plataforma == '' || plataforma.plataforma == undefined || plataforma.plataforma == null || plataforma.plataforma.length > 50
            ) {
                return message.ERROR_REQUIRED_FIELDS //400
            } else {
                //validação para verificar se o id existe no bd
                let resultPlataforma = await plataformaDAO.selectByIdPlataforma(parseInt(id))

                if (resultPlataforma != false || typeof (resultPlataforma) == 'object') {
                    if (resultPlataforma.length > 0) {
                        //add o id do filme no json com os dados
                        plataforma.id_plataforma = parseInt(id)

                        let result = await plataformaDAO.updatePlataforma(plataforma)
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

const excluirPlataforma = async function (id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS //400
        } else {

            //função que verifica se ID existe no BD
            let resultPlataforma = await plataformaDAO.selectAllPlataforma(parseInt(id))

            if (resultPlataforma != false || typeof (resultPlataforma) == 'object') {
                //se exestir, faremos o delete
                if (resultPlataforma.length > 0) {
                    //delete    
                    let result = await plataformaDAO.deletePlataforma(parseInt(id))

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

const listarPlataforma = async function () {
      try {
            //Objeto do tipo JSON
            let dadosPlataforma = {}
    
            //Chama a função para retornar os filmes cadastrados
            let resultPlataforma = await plataformaDAO.selectAllPlataforma()
            
            if(resultPlataforma != false || typeof(resultPlataforma) == 'object'){
                if(resultPlataforma.length > 0){
                    //Criando um JSON de retorno de dados para a API
                    dadosPlataforma.status = true
                    dadosPlataforma.status_code = 200
                    dadosPlataforma.items = resultPlataforma.length
                    dadosPlataforma.plataforma = resultPlataforma
    
                    return dadosPlataforma
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

const buscarPlataforma = async function (id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS //400
        } else {
            dadosPlataforma = {}
            let resultPlataforma = await plataformaDAO.selectByIdPlataforma(id)
            if (resultPlataforma != false || typeof (resultPlataforma) == 'object') {
                if (resultPlataforma.length > 0) {
                    dadosPlataforma.status = true
                    dadosPlataforma.status_code = 200
                    dadosPlataforma.plataforma = resultPlataforma

                    return dadosPlataforma
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
    inserirPlataforma,
    atualizarPlataforma,
    excluirPlataforma,
    listarPlataforma,
    buscarPlataforma
}