/*******************************************************************************
 * Objetivo: Criar a comunicação com o banco de dados para fazer CRUD de tipo
 * de premiação
 * Data: 11/02/2025
 * Autor: Giovanna
 * Versão: 1.0
********************************************************************************/

//import da biblioteca prisma/client
const {PrismaClient} = require('@prisma/client')

//Instancia (criarr um objt a ser utilizado) a biblioteca do prisma/client
const prisma = new PrismaClient()

const insertTipoPremiacao = async function (tipo_premiacao) {
    try {
        let sql = `insert into tbl_tipo_premiacao(
                                            tipo_premiacao
                                        )
                                        values(
                                            '${tipo_premiacao.tipo_premiacao}'
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
const updateTipoPremiacao = async function (tipo_premiacao) {
    try {
        let sql = `update tbl_tipo_premiacao set tipo_premiacao = '${tipo_premiacao.tipo_premiacao}' where id_tipo_premiacao = ${tipo_premiacao.id_tipo_premiacao}`

        let result = await prisma.$executeRawUnsafe(sql)
        
        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}
const deleteTipoPremiacao = async function (id_tipo_premiacao) {
    try {
        let sql = `delete tbl_tipo_premiacao where id_tipo_premiacao = ${id_tipo_premiacao}`

        let result = await prisma.$executeRawUnsafe(sql)
        
        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }  
}
const selectAllTipoPremiacao = async function () {
    try {
        let sql = `select * from tbl_tipo_premiacao order by desc`

        let result = await prisma.$queryRawUnsafe(sql)
        
        if(result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}
const selectByIdTipoPremiacao = async function (id_tipo_premiacao) {
    try {
        let sql = `select * from tbl_tipo_premiacao where id_tipo_premiacao = ${id_tipo_premiacao}`

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
    insertTipoPremiacao,
    updateTipoPremiacao,
    deleteTipoPremiacao,
    selectAllTipoPremiacao,
    selectByIdTipoPremiacao
}