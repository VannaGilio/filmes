/*******************************************************************************
 * Objetivo: Criar a comunicação com o banco de dados para fazer CRUD de sexo
 * Data: 11/02/2025
 * Autor: Giovanna
 * Versão: 1.0
********************************************************************************/

//import da biblioteca prisma/client
const {PrismaClient} = require('@prisma/client')

//Instancia (criarr um objt a ser utilizado) a biblioteca do prisma/client
const prisma = new PrismaClient()

const insertPremiacao = async function (premiacao) {
    try {
        let sql = `insert into tbl_premiacao(
                                        nome_premiacao
                                        )
                                        values(
                                            '${premiacao.nome_premiacao}'
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
const updatePremiacao = async function (premiacao) {
    try {
        let sql = `update tbl_premiacao set nome_premiacao = '${premiacao.premiacao}' where id_premiacao = ${premiacao.id_premiacao}`

        let result = await prisma.$executeRawUnsafe(sql)
        
        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}
const deletePremiacao = async function (id_premiacao) {
    try {
        let sql = `delete from tbl_premiacao where id_premiacao = ${id_premiacao}`

        let result = await prisma.$executeRawUnsafe(sql)
        
        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }  
}
const selectAllPremiacao = async function () {
    try {
        let sql = `select * from tbl_premiacao order by id_premiacao desc`

        let result = await prisma.$queryRawUnsafe(sql)
        
        if(result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}
const selectByIdPremiacao = async function (id_premiacao) {
        try {
        let sql = `select * from tbl_premiacao where id_premiacao = ${id_premiacao}`

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
    insertPremiacao,
    updatePremiacao,
    deletePremiacao,
    selectAllPremiacao,
    selectByIdPremiacao
}