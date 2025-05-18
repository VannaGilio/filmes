const message = require ('../../modulo/config')

const filme_plataformaDAO = require ('../../model/DAO/filme/filme_plataforma')

const inserirFilmePlataforma = async function (filmePlataforma, contentType) {
    try {
        if(String(contentType).toLowerCase == "application/json"){
            if( filmePlataforma.id_filme == "" || filmePlataforma.id_filme == null || filmePlataforma.id_filme == undefined || filmePlataforma.id_filme <=0 ||
                filmePlataforma.id_plataforma == "" || filmePlataforma.id_plataforma == null || filmePlataforma.id_plataforma == undefined || filmePlataforma.id_plataforma <=0 
            ){
                return message.ERROR_REQUIRED_FIELDS //400
            }else{
                let resultFilmePlataforma = await filme_plataformaDAO.insertFilmePlataforma(filmePlataforma)

                if(resultFilmePlataforma)
                    return message.SUCCESS_CREATED_ITEM //201
                else
                    return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }else{
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //400
    }
}

const atualizarFilmePlataforma = async function (id, filmePlataforma, contentType) {
    try {
        if (String(contentType).toLowerCase == "application/json"){
            if( id == "" || id == null || id == undefined || id <= 0 ||
                filmePlataforma.id_filme == "" || filmePlataforma.id_filme == null || filmePlataforma.id_filme == undefined || filmePlataforma.id_filme <0 ||
                filmePlataforma.id_plataforma == "" || filmePlataforma.id_plataforma == null || filmePlataforma.id_plataforma == undefined || filmePlataforma.id_plataforma <0
            ){
              return message.ERROR_REQUIRED_FIELDS //400  
            }else{
                let resultFilmePlataforma = await filme_plataformaDAO.atualizarFilmePlataforma(filmePlataforma)
                
                if(resultFilmePlataforma)
                    return message.SUCCESS_UPDATED_ITEM //201
                else
                    return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }else{
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}