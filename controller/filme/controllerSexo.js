//Import do arquivo dee mensagens e status code do projeto
const message = require('../../modulo/config')

const sexoDAO = require('../../model/DAO/sexo')

const inserirGenero = async function (sexo, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (sexo.sexo == '' || sexo.sexo == undefined || sexo.sexo == null || sexo.sexo.length > 50
            ) {
                return message.ERROR_REQUIRED_FIELDS //400
            } else {
                //Chama a função para inserir no BD e aguarda o retorno da função
                let resultSexo = await sexoDAO.insertSexo(sexo)

                if (resultSexo) {
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

const atualizarGenero = async function (id, sexo, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0 ||
                sexo.sexo == '' || sexo.sexo == undefined || sexo.sexo == null || sexo.sexo.length > 50
            ) {
                return message.ERROR_REQUIRED_FIELDS //400
            } else {
                //validação para verificar se o id existe no bd
                let resultSexo = await sexoDAO.selectByIdSexo(parseInt(id))

                if (resultSexo != false || typeof (resultSexo) == 'object') {
                    if (resultSexo.length > 0) {
                        //add o id do filme no json com os dados
                        sexo.id_sexo = parseInt(id)

                        let result = await sexoDAO.updateGenero(sexo)
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
            let resultSexo = await sexoDAO.selectAllSexo(parseInt(id))

            if (resultSexo != false || typeof (resultSexo) == 'object') {
                //se exestir, faremos o delete
                if (resultSexo.length > 0) {
                    //delete    
                    let result = await sexoDAO.deleteSexo(parseInt(id))

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
            let dadosSexo = {}
    
            //Chama a função para retornar os filmes cadastrados
            let resultSexo = await sexoDAO.selectAllSexo()
            
            if(resultSexo != false || typeof(resultSexo) == 'object'){
                if(resultSexo.length > 0){
                    //Criando um JSON de retorno de dados para a API
                    dadosSexo.status = true
                    dadosSexo.status_code = 200
                    dadosSexo.items = resultSexo.length
                    dadosSexo.genero = resultSexo
    
                    return dadosSexo
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

const buscarGenero = async function (id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS //400
        } else {
            dadosSexo = {}
            let resultSexo = await sexoDAO.selectByIdSexo(id)
            if (resultSexo != false || typeof (resultSexo) == 'object') {
                if (resultSexo.length > 0) {
                    dadosSexo.status = true
                    dadosSexo.status_code = 200
                    dadosSexo.genero = resultSexo

                    return dadosSexo
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
Sexo