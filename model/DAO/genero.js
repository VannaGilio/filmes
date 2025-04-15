/*******************************************************************************
 * Objetivo: Criar a comunicação com o banco de dados para fazer CRUD de genero
 * Data: 11/02/2025
 * Autor: Giovanna
 * Versão: 1.0
********************************************************************************/

//import da biblioteca prisma/client
const {PrismaClient} = require('@prisma/client')

//Instancia (criarr um objt a ser utilizado) a biblioteca do prisma/client
const prisma = new PrismaClient()

const insertGenero = async function (genero) {
    try {
        let sql = `insert into tbl_genero(
                                            genero
                                        )
                                        values(
                                            '${genero.genero}'
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
const updateGenero = async function (genero) {
    try {
        let sql = `update tbl_genero set genero = '${genero.genero}' where id_genero = ${genero.id_genero}`

        let result = await prisma.$executeRawUnsafe(sql)
        
        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}
const deleteGenero = async function (id_genero) {
    try {
        let sql = `delete tbl_genero where id_genero = ${id_genero}`

        let result = await prisma.$executeRawUnsafe(sql)
        
        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }  
}
const selectAllGenero = async function () {
    try {
        let sql = `select * from tbl_genero order by desc`

        let result = await prisma.$queryRawUnsafe(sql)
        
        if(result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}
const selectByIdGenero = async function (id_genero) {
    try {
        let sql = `select * from tbl_genero where id_genero = ${id_genero}`

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
    insertGenero,
    updateGenero,
    deleteGenero,
    selectAllGenero,
    selectByIdGenero
}