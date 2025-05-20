//import da biblioteca do prisma client para executar os scripts SQL
const { PrismaClient } = require('@prisma/client')

//Instancia (criar um objeto a ser utilizado) a biblioteca do prisma/client
const prisma = new PrismaClient()

//Função para inserir um novo FilmeGenero
const insertNacionalidadeAtor= async function(nacionalidadeAtor){
  try {

      let sql = `insert into tbl_nacionalidade_ator  ( 
                                            id_ator,
                                            id_nacionalidade
                                        ) 
                                            values 
                                        (
                                            ${nacionalidadeAtor.id_ator},
                                            ${nacionalidadeAtor.id_nacionalidade}
                                        )`

      //Executa o scriptSQL no banco de dados e aguarda o retorno do BD para                                  
      let result = await prisma.$executeRawUnsafe(sql)

      if(result)
          return true
      else
          return false
  } catch (error) {
      
      return false
  }
}
const updateNacionalidadeAtor = async function(nacionalidadeAtor){
    try {
        let sql = `update tbl_nacionalidade_ator set  id_ator = ${nacionalidadeAtor.id_ator},
                                                      id_nacionalidade = ${nacionalidadeAtor.id_nacionalidade}
                                          
                              where id_nacionalidade_ator = ${nacionalidadeAtor.id_nacionalidade_ator}                
                              `
        let result = await prisma.$executeRawUnsafe(sql)
  
        if(result)
          return true
        else
          return false
    } catch (error) {
      return false
    }
}
const deleteNacionalidadeAtor = async function(id_nacionalidade_ator){
    try {
      let sql = `delete from tbl_nacionalidade_ator where id_nacionalidade_ator = ${id_nacionalidade_ator}`
  
      let result = await prisma.$executeRawUnsafe(sql)
  
      if (result)
        return true
      else 
        return false
    } catch (error) {
      return false
    }
}
const selectAllNacionalidadeAtor = async function(){
    try {
      //ScriptSQL para retornar todos os dados
      let sql = 'select * from tbl_nacionalidade_ator order by id_nacionalidade_ator desc'

      //Executa o scriptSQL no BD e aguarda o retorno dos dados
      let result = await prisma.$queryRawUnsafe(sql)

      if(result)
        return result
      else
        return false

    } catch (error) {
      return false
    }
}
const selectByIdNacionalidadeAtor = async function(id_nacionalidade_ator){
    try {
      let sql = `select * from tbl_nacionalidade_ator where id_nacionalidade_ator = ${id_nacionalidade_ator}`
  
      let result = await prisma.$queryRawUnsafe(sql)
  
      if (result)
        return result
      else 
        return false
    } catch (error) {
      return false
    }
}
const selectAtorByIdNacionalidade = async function(id_nacionalidade){
    try {
        let sql = `select tbl_ator.* from tbl_ator 
                                              inner join tbl_nacionalidade_ator
                                                on tbl_ator.id_ator = tbl_nacionalidade_ator.id_ator
                                              inner join tbl_nacionalidade
                                                on tbl_nacionalidade.id_nacionalidade = tbl_nacionalidade.id_nacionalidade
                    where tbl_nacionalidade_ator.id_nacionalidade = ${id_nacionalidade}`
  
        let result = await prisma.$queryRawUnsafe(sql)
  
      if (result)
          return result
      else 
          return false
    } catch (error) {
        return false
    }
}
const selectNacionalidadeByIdAtor = async function(idAtor){
    try {
         let sql = `select tbl_nacionalidade.* from tbl_ator 
                                               inner join tbl_nacionalidade_ator
                                                 on tbl_ator.id_ator = tbl_nacionalidade_ator.id_ator
                                               inner join tbl_nacionalidade
                                                 on tbl_nacionalidade.id_nacionalidade = tbl_nacionalidade_ator.id_nacionalidade
                     where tbl_nacionalidade_ator.id_ator = ${idAtor}`
                     
        let result = await prisma.$queryRawUnsafe(sql)
   
    if (result)
        return result
    else 
        return false
    } catch (error) {
        return false
    }
}

module.exports = {
    insertNacionalidadeAtor,
    updateNacionalidadeAtor,
    deleteNacionalidadeAtor,
    selectAllNacionalidadeAtor,
    selectByIdNacionalidadeAtor,
    selectAtorByIdNacionalidade,
    selectNacionalidadeByIdAtor
} 
