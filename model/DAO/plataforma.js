/*******************************************************************************
 * Objetivo: Criar a comunicação com o banco de dados para fazer CRUD de plata-
 * formas
 * Data: 11/02/2025
 * Autor: Giovanna
 * Versão: 1.0
********************************************************************************/

//import da biblioteca prisma/client
const {PrismaClient} = require('@prisma/client')

//Instancia (criarr um objt a ser utilizado) a biblioteca do prisma/client
const prisma = new PrismaClient()

const insertPlataforma = async function (plataforma) {
    try {
        let sql = `insert into tbl_plataforma(
                                                plataforma
                                        )
                                        values(
                                            '${plataforma.plataforma}'
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
const updatePlataforma = async function (plataforma) {
    try {
        let sql = `update tbl_plataforma set plataforma = '${plataforma.plataforma}' where id_plataforma = ${plataforma.id_plataforma}`

        let result = await prisma.$executeRawUnsafe(sql)
        
        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}
const deletePlataforma = async function (id_plataforma) {
    try {
        let sql = `delete from tbl_plataforma where id_plataforma = ${id_plataforma}`

        let result = await prisma.$executeRawUnsafe(sql)
        
        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }  
}
const selectAllPlataforma = async function () {
    try {
        let sql = `select * from tbl_plataforma order by id_plataforma desc`

        let result = await prisma.$queryRawUnsafe(sql)
        
        if(result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}
const selectByIdPlataforma = async function (id_plataforma) {
    try {
        let sql = `select * from tbl_plataforma where id_plataforma = ${id_plataforma}`

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
    insertPlataforma,
    updatePlataforma,
    deletePlataforma,
    selectAllPlataforma,
    selectByIdPlataforma
}