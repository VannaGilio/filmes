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

const insertSexo = async function (sexo) {
    try {
        let sql = `insert into tbl_sexo(
                                            sexo
                                        )
                                        values(
                                            '${sexo.sexo}'
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
const updateSexo = async function (sexo) {
    try {
        let sql = `update tbl_sexo set sexo = '${sexo.sexo}' where id_sexo = ${sexo.id_sexo}`

        let result = await prisma.$executeRawUnsafe(sql)
        
        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}
const deleteSexo = async function (id_sexo) {
    try {
        let sql = `delete tbl_sexo where id_sexo = ${id_sexo}`

        let result = await prisma.$executeRawUnsafe(sql)
        
        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }  
}
const selectAllSexo = async function () {
    try {
        let sql = `select * from tbl_sexo order by desc`

        let result = await prisma.$queryRawUnsafe(sql)
        
        if(result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}
const selectByIdSexo = async function (id_sexo) {
        try {
        let sql = `select * from tbl_sexo where id_sexo = ${id_sexo}`

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
    insertSexo,
    updateSexo,
    deleteSexo,
    selectAllSexo,
    selectByIdSexo
}