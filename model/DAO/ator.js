//import da biblioteca do prisma client para executar os scripts SQL
const { PrismaClient } = require('@prisma/client')

//Instancia (criar um objeto a ser utilizado) a biblioteca do prisma/client
const prisma = new PrismaClient()

//Função para inserir um novo FilmeGenero
const insertAtor = async function(ator){
  try {
      let sql = `insert into tbl_ator  ( 
                                          nome,
                                          idade,
                                          id_sexo
                                        ) 
                                          values 
                                        (
                                          '${ator.nome}',
                                          '${ator.idade}',
                                          '${ator.id_sexo}'
                                        )`

      let result = await prisma.$executeRawUnsafe(sql)

      if(result)
          return true
      else
          return false
  } catch (error) {
      
      return false
  }
}
const updateAtor = async function(ator){
    try {
        let sql = `update tbl_ator set    nome = ${ator.nome},
                                          idade = ${ator.idade},
                                          id_sexo = ${ator.id_sexo} 
                  where id_ator = ${ator.id_ator}                
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
const deleteAtor = async function(id){
    try {
      let sql = `delete from tbl_ator where id_ator = ${id}`
  
      let result = await prisma.$executeRawUnsafe(sql)
  
      if (result)
        return true
      else 
        return false
    } catch (error) {
      return false
    }
}
const selectAllAtor = async function(){
    try {
      //ScriptSQL para retornar todos os dados
      let sql = 'select * from tbl_ator order by id_ator desc'

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
const selectByIdAtor = async function(id){
    try {
      let sql = `select * from tbl_ator where id_ator = ${id}`
  
      let result = await prisma.$queryRawUnsafe(sql)
  
      if (result)
        return result
      else 
        return false
    } catch (error) {
      return false
    }
}
const selectLastIdAtor = async function() {
    try {
        let sql = 'select id_ator from tbl_ator order by id_ator desc limit 1'
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
  insertAtor,
  deleteAtor,
  updateAtor,
  selectAllAtor,
  selectByIdAtor,
  selectLastIdAtor
} 
