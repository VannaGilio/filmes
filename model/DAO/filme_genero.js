//import da biblioteca do prisma client para executar os scripts SQL
const { PrismaClient } = require('@prisma/client')

//Instancia (criar um objeto a ser utilizado) a biblioteca do prisma/client
const prisma = new PrismaClient()

//Função para inserir um novo FilmeGenero
const insertFilmeGenero = async function(filmeGenero){
  try {

      let sql = `insert into tbl_filme_genero  ( 
                                          id,
                                          id_genero
                                        ) 
                                          values 
                                        (
                                          ${filmeGenero.id},
                                          ${filmeGenero.id_genero}
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
const updateFilmeGenero = async function(filmeGenero){
    try {
        let sql = `update tbl_filme_genero set        id = ${filmeGenero.id},
                                                      id_genero = ${filmeGenero.id_genero}
                                          
                              where id_filme_genero = ${filmeGenero.id_filme_genero}                
                              `
        let resultFilmeGenero = await prisma.$executeRawUnsafe(sql)
  
        if(resultFilmeGenero)
          return true
        else
          return false
    } catch (error) {
      return false
    }
}
const deleteFilmeGenero = async function(id_filme_genero){
    try {
      let sql = `delete from tbl_filme_genero where id_filme_genero = ${id_filme_genero}`
  
      let result = await prisma.$executeRawUnsafe(sql)
  
      if (result)
        return true
      else 
        return false
    } catch (error) {
      return false
    }
}
const selectAllFilmeGenero = async function(){
    try {
      //ScriptSQL para retornar todos os dados
      let sql = 'select * from tbl_filme_genero order by id_filme_genero desc'

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
const selectByIdFilmeGenero = async function(id_filme_genero){
    try {
      let sql = `select * from tbl_filme_genero where id_filme_genero = ${id_filme_genero}`
  
      let result = await prisma.$queryRawUnsafe(sql)
  
      if (result)
        return result
      else 
        return false
    } catch (error) {
      return false
    }
}

const selectFilmeByIdGenero = async function(idGenero){
    try {
        let sql = `select tbl_filme.* from tbl_filme 
                                              inner join tbl_filme_genero
                                                on tbl_filme.id = tbl_filme_genero.id_filme
                                              inner join tbl_genero
                                                on tbl_genero.id_genero = tbl_filme_genero.id_genero
                    where tbl_filme_genero.id_genero = ${idGenero}`
  
        let result = await prisma.$queryRawUnsafe(sql)
  
      if (result)
          return result
      else 
          return false
    } catch (error) {
        return false
    }
}

const selectGeneroByIdFilme = async function(idFilme){
    try {
         let sql = `select tbl_genero.* from tbl_filme 
                                               inner join tbl_filme_genero
                                                 on tbl_filme.id = tbl_filme_genero.id_filme
                                               inner join tbl_genero
                                                 on tbl_genero.id_genero = tbl_filme_genero.id_genero
                     where tbl_filme_genero.id_filme = ${idFilme}`
                     
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
    insertFilmeGenero,
    updateFilmeGenero,
    deleteFilmeGenero,
    selectAllFilmeGenero,
    selectByIdFilmeGenero,
    selectFilmeByIdGenero,
    selectGeneroByIdFilme
} 
