//import da biblioteca do prisma client para executar os scripts SQL
const { PrismaClient } = require('@prisma/client')

//Instancia (criar um objeto a ser utilizado) a biblioteca do prisma/client
const prisma = new PrismaClient()

//Função para inserir um novo FilmeGenero
const insertFilmeTipoPremiacao = async function(filmePremiacao){
  try {

      let sql = `insert into tbl_filme_tipo_premiacao  ( 
                                          id_filme,
                                          id_tipo_premiacao
                                        ) 
                                          values 
                                        (
                                          ${filmePremiacao.id_filme},
                                          ${filmePremiacao.id_tipo_premiacao}
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
const updateFilmeTipoPremiacao = async function(filmePremiacao){
    try {
        let sql = `update tbl_filme_tipo_premiacao set        id_filme = ${filmePremiacao.id_filme},
                                                      id_tipo_premiacao = ${filmePremiacao.id_tipo_premiacao}
                                          
                              where id_filme_tipo_premiacao = ${filmePremiacao.id_filme_tipo_premiacao}                
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
const deleteFilmeTipoPremiacao = async function(id_filme_tipo_premiacao){
    try {
      let sql = `delete from tbl_filme_tipo_premiacao where id_filme_tipo_premiacao = ${id_filme_tipo_premiacao}`
  
      let result = await prisma.$executeRawUnsafe(sql)
  
      if (result)
        return true
      else 
        return false
    } catch (error) {
      return false
    }
}
const selectAllFilmeTipoPremiacao = async function(){
    try {
      //ScriptSQL para retornar todos os dados
      let sql = 'select * from tbl_filme_tipo_premiacao order by id_filme_tipo_premiacao desc'

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
const selectByIdFilmeTipoPremiacao = async function(id_filme_tipo_premiacao){
    try {
      let sql = `select * from tbl_filme_tipo_premiacao where id_filme_tipo_premiacao = ${id_filme_tipo_premiacao}`
  
      let result = await prisma.$queryRawUnsafe(sql)
  
      if (result)
        return result
      else 
        return false
    } catch (error) {
      return false
    }
}

const selectFilmeByIdTipoPremiacao = async function(id_tipo_premiacao){
    try {
        let sql = `select tbl_filme.* from tbl_filme 
                                              inner join tbl_filme_tipo_premiacao
                                                on tbl_filme.id = tbl_filme_tipo_premiacao.id_filme
                                              inner join tbl_tipo_premiacao
                                                on tbl_tipo_premiacao.id_tipo_premiacao = tbl_filme_tipo_premiacao.id_tipo_premiacao
                    where tbl_filme_tipo_premiacao.id_tipo_premiacao = ${id_tipo_premiacao}`
  
        let result = await prisma.$queryRawUnsafe(sql)
  
      if (result)
          return result
      else 
          return false
    } catch (error) {
        return false
    }
}

const selectTipoPremiacaoByIdFilme = async function(idFilme){
    try {
         let sql = `select tbl_tipo_premiacao.* from tbl_filme 
                                               inner join tbl_filme_tipo_premiacao
                                                 on tbl_filme.id = tbl_filme_tipo_premiacao.id_filme
                                               inner join tbl_tipo_premiacao
                                                 on tbl_tipo_premiacao.id_tipo_premiacao = tbl_filme_tipo_premiacao.id_tipo_premiacao
                     where tbl_filme_tipo_premiacao.id_filme = ${idFilme}`
                     
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
    insertFilmeTipoPremiacao,
    deleteFilmeTipoPremiacao,
    updateFilmeTipoPremiacao,
    selectAllFilmeTipoPremiacao,
    selectByIdFilmeTipoPremiacao,
    selectFilmeByIdTipoPremiacao,
    selectTipoPremiacaoByIdFilme
} 
