const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const insertFilmePlataforma = async function (filmePlataforma) {
    try {
        const sql = `insert into tbl_filme_plataforma (
                                                    id_filme,
                                                    id_plataforma
                                                    )
                                                    values(
                                                    ${filmePlataforma.id_filme},
                                                    ${filmePlataforma.id_plataforma}
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

const updateFilmePlataforma = async function (filmeGenero) {
    try {
        const sql = `update tbl_filme_plataforma set
                                                    id_filme = ${filmeGenero.id_filme},
                                                    id_plataforma = ${filmeGenero.id_plataforma}
                    where id_filme_plataforma = ${filmeGenero.id_filme_plataforma}`
        let result = await prisma.$executeRawUnsafe(sql)
        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }    
}

const deleteFilmePlataforma = async function (id_filme_plataforma) {
    try {
        const sql = `delete tbl_filme_plataforma where id_filme_plataforma = ${id_filme_plataforma} `
        let result = await prisma.$executeRawUnsafe(sql)
        if(result)
            return true
        else 
            return false
    } catch (error) {
        return false
    }
}

const selectAllFilmePlataforma = async function () {
    try {
        const sql = `select * tbl_filme_plataforma order by desc id_filme__plataforma`
        let result = await prisma.$queryRawUnsafe(sql)
        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const selectByIdFilmePlataforma = async function (id_filme_plataforma) {
    try {
        const sql = `select * tbl_filme_plataforma where id_filme_plataforma = ${id_filme_plataforma}`
        let result = await prisma.$queryRawUnsafe(sql)
        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

module.exports = {
    insertFilmePlataforma,
    updateFilmePlataforma,
    deleteFilmePlataforma,
    selectAllFilmePlataforma,
    selectByIdFilmePlataforma
}