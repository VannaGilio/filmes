//Import do arquivo dee mensagens e status code do projeto
const message = require('../../modulo/config')

const linguagemDAO = require('../../model/DAO/linguagem')

const inserirLinguagem = async function (linguagem, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (linguagem.idioma == '' || linguagem.idioma == undefined || linguagem.idioma == null || linguagem.idioma.length > 100 ||
                linguagem.codigo_iso == '' || linguagem.codigo_iso == undefined || linguagem.codigo_iso == null || linguagem.codigo_iso > 10 
            ) {
                return message.ERROR_REQUIRED_FIELDS //400
            } else {
                //Chama a função para inserir no BD e aguarda o retorno da função
                let resultLinguagem = await linguagemDAO.insertLinguagem(linguagem)

                if (resultLinguagem) {
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

const atualizarLinguagem = async function (id, contentType, linguagem) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0 ||
            linguagem.idioma == '' || linguagem.idioma == undefined || linguagem.idioma == null || linguagem.idioma.length > 100 ||
            linguagem.codigo_iso == '' || linguagem.codigo_iso == undefined || linguagem.codigo_iso == null || linguagem.codigo_iso > 10 
            ) {
                return message.ERROR_REQUIRED_FIELDS //400
            } else {
                //validação para verificar se o id existe no bd
                let resultLinguagem = await linguagemDAO.selectByIdLinguagem(parseInt(id))

                if (resultLinguagem != false || typeof (resultLinguagem) == 'object') {
                    if (resultLinguagem.length > 0) {
                        //add o id do filme no json com os dados
                        linguagem.id_linguagem = parseInt(id)

                        let result = await linguagemDAO.updateLinguagem(linguagem)
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

const excluirLinguagem = async function (id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS //400
        } else {

            //função que verifica se ID existe no BD
            let resultLinguagem = await linguagemDAO.selectAllLinguagem(parseInt(id))

            if (resultLinguagem != false || typeof (resultLinguagem) == 'object') {
                //se exestir, faremos o delete
                if (resultLinguagem.length > 0) {
                    //delete    
                    let result = await linguagemDAO.deleteLinguagem(parseInt(id))

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

const listarLinguagem = async function () {
      try {
            //Objeto do tipo JSON
            let dadosLinguagem = {}
    
            //Chama a função para retornar os filmes cadastrados
            let resultLinguagem = await linguagemDAO.selectAllLinguagem()
            
            if(resultLinguagem != false || typeof(resultLinguagem) == 'object'){
                if(resultLinguagem.length > 0){
                    //Criando um JSON de retorno de dados para a API
                    dadosLinguagem.status = true
                    dadosLinguagem.status_code = 200
                    dadosLinguagem.items = resultLinguagem.length
                    dadosLinguagem.linguagem = resultLinguagem
    
                    return dadosLinguagem
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

const buscarLinguagem = async function (id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS //400
        } else {
            dadosLinguagem = {}
            let resultLinguagem = await linguagemDAO.selectByIdLinguagem(id)
            if (resultLinguagem != false || typeof (resultLinguagem) == 'object') {
                if (resultLinguagem.length > 0) {
                    dadosLinguagem.status = true
                    dadosLinguagem.status_code = 200
                    dadosLinguagem.linguagem = resultLinguagem

                    return dadosLinguagem
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
    inserirLinguagem,
    atualizarLinguagem,
    excluirLinguagem,
    listarLinguagem,
    buscarLinguagem
}