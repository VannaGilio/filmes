/*******************************************************************************
 * Objetivo: Criar a comunicação com o banco de dados para fazer CRUD de lingua-
 * gem
 * Data: 11/02/2025
 * Autor: Giovanna
 * Versão: 1.0
********************************************************************************/

//import da biblioteca prisma/client
const { PrismaClient } = require('@prisma/client')

//Instancia (criarr um objt a ser utilizado) a biblioteca do prisma/client
const prisma = new PrismaClient()

const insertLinguagem = async function (linguagem) {
    try {
        let sql = `insert into tbl_linguagem(
                                            idioma,
                                            codigo_iso
                                        )
                                        values(
                                            '${linguagem.idioma}',
                                            '${linguagem.codigo_iso}'
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
const updateLinguagem = async function (linguagem) {
    try {
        let sql = `update tbl_linguagem set idioma = '${linguagem.idioma}',
                                            codigo_iso = '${linguagem.codigo_iso}'
                    where id_linguagem = ${linguagem.id_linguagem}`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}
const deleteLinguagem = async function (id_linguagem) {
    try {
        let sql = `delete from tbl_linguagem where id_linguagem = ${id_linguagem}`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}
const selectAllLinguagem = async function () {
    try {
        let sql = `select * from tbl_linguagem order by id_linguagem desc`

        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}
const selectByIdLinguagem = async function (id_linguagem) {
    try {
        let sql = `select * from tbl_linguagem where id_linguagem = ${id_linguagem}`

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
    insertLinguagem,
    updateLinguagem,
    deleteLinguagem,
    selectAllLinguagem,
    selectByIdLinguagem
}