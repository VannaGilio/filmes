//import da biblioteca do prisma client para executar os scripts SQL
const { PrismaClient } = require('@prisma/client')

//Instancia (criar um objeto a ser utilizado) a biblioteca do prisma/client
const prisma = new PrismaClient()

//Função para inserir um novo FilmeGenero
const insertEditora = async function(editora){
  try {
      let sql = `insert into tbl_editora ( 
                                          nome,
                                          id_nacionalidade
                                        ) 
                                          values 
                                        (
                                          '${editora.nome}',
                                          '${editora.id_nacionalidade}'
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
const updateEditorar = async function(editora){
    try {
        let sql = `update tbl_editora set    nome = ${editora.nome},
                                          id_nacionalidade = ${editora.id_nacionalidade} 
                  where id_editora = ${editora.id_editora}                
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
const deleteEditora = async function(id){
    try {
      let sql = `delete from tbl_editora where id_editora = ${id}`
  
      let result = await prisma.$executeRawUnsafe(sql)
  
      if (result)
        return true
      else 
        return false
    } catch (error) {
      return false
    }
}
const selectAllEditora = async function(){
    try {
      //ScriptSQL para retornar todos os dados
      let sql = 'select * from tbl_editora order by id_editora desc'

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
const selectByIdEditora = async function(id){
    try {
      let sql = `select * from tbl_editora where id_editora = ${id}`
  
      let result = await prisma.$queryRawUnsafe(sql)
  
      if (result)
        return result
      else 
        return false
    } catch (error) {
      return false
    }
}
const selectLastIdEditora = async function() {
    try {
        let sql = 'select id_editora from tbl_editora order by id_editora desc limit 1'
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
    insertEditora,
    updateEditorar,
    deleteEditora,
    selectAllEditora,
    selectByIdEditora,
    selectLastIdEditora
} 
