//import da biblioteca do prisma client para executar os scripts SQL
const { PrismaClient } = require('@prisma/client')

//Instancia (criar um objeto a ser utilizado) a biblioteca do prisma/client
const prisma = new PrismaClient()

const insertFilmeAtor = async function (filmeAtor) {
    try {
        let sql = `insert into tbl_filme_ator ( 
                                            id_filme,
                                            id_ator
                                        ) 
                                            values 
                                        (
                                            '${filmeAtor.id_filme}',
                                            '${filmeAtor.id_ator}'
                                        )`

        //Executa o scriptSQL no banco de dados e aguarda o retorno do BD para                                  
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}
const updateFilmeAtor = async function (filmeAtor) {
    try {
        let sql = `update tbl_filme_ator set        id_filme = ${filmeAtor.id_filme},
                                                    id_ator = ${filmeAtor.id_ator}
                                          
                              where id_filme_ator = ${filmeAtor.id_filme_ator}                
                              `
        let resultFilmeAtor = await prisma.$executeRawUnsafe(sql)

        if (resultFilmeAtor)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}
const deleteFilmeAtor = async function (id_filme_ator) {
    try {
        let sql = `delete from tbl_filme_ator where id_filme_ator = ${id_filme_ator}`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}
const selectAllFilmeAtor = async function () {
    try {
        //ScriptSQL para retornar todos os dados
        let sql = 'select * from tbl_filme_ator order by id_filme_ator desc'

        //Executa o scriptSQL no BD e aguarda o retorno dos dados
        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result
        else
            return false

    } catch (error) {
        return false
    }
}
const selectByIdFilmeAtor = async function (id_filme_ator) {
    try {
        let sql = `select * from tbl_filme_ator where id_filme_ator = ${id_filme_ator}`

        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}
const selectFilmeByIdAtor = async function (idAtor) {
    try {
        let sql = `select tbl_filme.* from tbl_filme 
                                              inner join tbl_filme_ator
                                                on tbl_filme.id = tbl_filme_ator.id_filme
                                              inner join tbl_ator
                                                on tbl_ator.id_ator = tbl_filme_ator.id_ator
                    where tbl_filme_ator.id_ator = ${idAtor}`

        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}
const selectAtorByIdFilme = async function (idFilme) {
    try {
        let sql = `select tbl_ator.* from tbl_filme 
                                               inner join tbl_filme_ator
                                                 on tbl_filme.id = tbl_filme_ator.id_filme
                                               inner join tbl_ator
                                                 on tbl_ator.id_ator = tbl_filme_ator.id_ator
                     where tbl_filme_ator.id_filme = ${idFilme}`

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
    insertFilmeAtor,
    updateFilmeAtor,
    deleteFilmeAtor,
    selectAllFilmeAtor,
    selectByIdFilmeAtor,
    selectFilmeByIdAtor,
    selectAtorByIdFilme
} 
