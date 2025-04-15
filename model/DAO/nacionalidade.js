/*******************************************************************************
 * Objetivo: Criar a comunicação com o banco de dados para fazer CRUD de naciona-
 * lidade
 * Data: 11/02/2025
 * Autor: Giovanna
 * Versão: 1.0
********************************************************************************/

//import da biblioteca prisma/client
const { PrismaClient } = require('@prisma/client')

//Instancia (criarr um objt a ser utilizado) a biblioteca do prisma/client
const prisma = new PrismaClient()

const insertNacionalidade = async function (nacionalidade) {
    try {
        let sql = `insert to into tbl_nacionalidade (
                                                        nacionalidade                           
                                                        )
                                                        values(
                                                        '${nacionalidade.nacionalidade}'
                                                        )`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}
const updateNacionalidade = async function (nacionalidade) {
    try {
        let sql = `update tbl_nacionalidade set nacionalidade = '${nacionalidade.nacionalidade}' where id_nacionalidade = ${nacionalidade.id_nacionalidade}` 

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}
const deleteNacionalidade = async function (id_nacionalidade) {
    try {
        let sql = `delete from tbl_nacionalidade where id_nacionalidade = ${id_nacionalidade}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}
const selectAllNacionalidade = async function () {
    try {
        
        let sql = `select * from tbl_nacionalidade order by id_nacionalidade desc`
        
        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else
            return false
    } catch (error) {
        return false      
    }
}
const selectByIdNacionalidade = async function (id_nacionalidade) {
    try {
        let sql = `select * from tbl_nacionalidade where id_nacionalidade = ${id_nacionalidade}`

        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

module.exports = {
    insertNacionalidade,
    updateNacionalidade,
    deleteNacionalidade,
    selectAllNacionalidade,
    selectByIdNacionalidade
}