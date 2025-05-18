//import da biblioteca do prisma client para executar os scripts SQL
const { PrismaClient } = require('@prisma/client')

//Instancia (criar um objeto a ser utilizado) a biblioteca do prisma/client
const prisma = new PrismaClient()

//Função para inserir um novo FilmeGenero
const insertFilmeLinguagem = async function(filmeLinguagem){
  try {

      let sql = `insert into tbl_filme_linguagem  ( 
                                          id_filme,
                                          id_linguagem
                                        ) 
                                          values 
                                        (
                                          ${filmeLinguagem.id_filme},
                                          ${filmeLinguagem.id_linguagem}
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
const updateFilmeLinguagem = async function(filmeLinguagem){
    try {
        let sql = `update tbl_filme_linguagem set     id_filme = ${filmeLinguagem.id_filme},
                                                      id_linguagem = ${filmeLinguagem.id_linguagem}
                                          
                              where id_filme_linguagem = ${filmeLinguagem.id_filme_linguagem}                
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
const deleteFilmeLinguagem = async function(id_filme_linguagem){
    try {
      let sql = `delete from tbl_filme_linguagem where id_filme_linguagem = ${id_filme_linguagem}`
  
      let result = await prisma.$executeRawUnsafe(sql)
  
      if (result)
        return true
      else 
        return false
    } catch (error) {
      return false
    }
}
const selectAllFilmeLinguagem = async function(){
    try {
      //ScriptSQL para retornar todos os dados
      let sql = 'select * from tbl_filme_linguagem order by id_filme_linguagem desc'

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
const selectByIdFilmeLinguagem = async function(id_filme_linguagem){
    try {
      let sql = `select * from tbl_filme_linguagem where id_filme_linguagem = ${id_filme_linguagem}`
  
      let result = await prisma.$queryRawUnsafe(sql)
  
      if (result)
        return result
      else 
        return false
    } catch (error) {
      return false
    }
}

const selectFilmeByIdLinguagem = async function(idLinguagem){
    try {
        let sql = `select tbl_filme.* from tbl_filme 
                                              inner join tbl_filme_linguagem
                                                on tbl_filme.id = tbl_filme_linguagem.id_filme
                                              inner join tbl_linguagem
                                                on tbl_linguagem.id_linguagem = tbl_filme_linguagem.id_linguagem
                    where tbl_filme_linguagem.id_linguagem = ${idLinguagem}`
  
        let result = await prisma.$queryRawUnsafe(sql)
  
      if (result)
          return result
      else 
          return false
    } catch (error) {
        return false
    }
}

const selectLinguagemByIdFilme = async function(idFilme){
    try {
         let sql = `select tbl_linguagem.* from tbl_filme 
                                               inner join tbl_filme_linguagem
                                                 on tbl_filme.id = tbl_filme_linguagem.id_filme
                                               inner join tbl_linguagem
                                                 on tbl_linguagem.id_linguagem = tbl_filme_linguagem.id_linguagem
                     where tbl_filme_linguagem.id_filme = ${idFilme}`
                     
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
    insertFilmeLinguagem,
    updateFilmeLinguagem,
    deleteFilmeLinguagem,
    selectAllFilmeLinguagem,
    selectByIdFilmeLinguagem,
    selectFilmeByIdLinguagem,
    selectLinguagemByIdFilme
} 
