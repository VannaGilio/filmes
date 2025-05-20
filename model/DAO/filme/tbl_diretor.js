//import da biblioteca do prisma client para executar os scripts SQL
const { PrismaClient } = require('@prisma/client')

//Instancia (criar um objeto a ser utilizado) a biblioteca do prisma/client
const prisma = new PrismaClient()

//Função para inserir um novo FilmeGenero
const insertDiretor = async function(diretor){
  try {

      let sql = `insert into tbl_diretor  ( 
                                          nome,
                                          idade,
                                          id_sexo
                                        ) 
                                          values 
                                        (
                                          ${diretor.nome},
                                          ${diretor.idade},
                                          ${diretor.id_sexo}
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
const updateDiretor = async function(diretor){
    try {
        let sql = `update tbl_diretor set nome = ${diretor.nome},
                                          idade = ${diretor.idade},
                                          id_sexo = ${diretor.id_sexo} 
                  where id_diretor = ${diretor.id_diretor}                
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
const deleteDiretor = async function(id){
    try {
      let sql = `delete from tbl_diretor where id_diretor = ${id}`
  
      let result = await prisma.$executeRawUnsafe(sql)
  
      if (result)
        return true
      else 
        return false
    } catch (error) {
      return false
    }
}
const selectAllDiretor = async function(){
    try {
      //ScriptSQL para retornar todos os dados
      let sql = 'select * from tbl_diretor order by id_diretor desc'

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
const selectByIdDiretor = async function(id){
    try {
      let sql = `select * from tbl_diretor where id_diretor = ${id}`
  
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
  insertDiretor,
  updateDiretor,
  deleteDiretor,
  selectAllDiretor,
  selectByIdDiretor
} 
