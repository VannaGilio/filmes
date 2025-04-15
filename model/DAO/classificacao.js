/*******************************************************************************
 * Objetivo: Criar a comunicação com o banco de dados para fazer CRUD de 
 * classificação de filmes
 * Data: 11/02/2025
 * Autor: Giovanna
 * Versão: 1.0
********************************************************************************/

//import da biblioteca prisma/client
const {PrismaClient} = require('@prisma/client')

//Instancia (criarr um objt a ser utilizado) a biblioteca do prisma/client
const prisma = new PrismaClient()

//INSERT para adicionar classificação
const insertClassificacao = async function (classificacao) {
    try {
        let sql = `insert into tbl_classificacao(  
                                                    faixa_etaria,
                                                    link_icone_classificacao
                                                )
                                                values(
                                                    '${classificacao.faixa_etaria}',
                                                    '${classificacao.link_icone_classificacao}'
                                                )`
        let result = await prisma.$executeRawUnsafe(sql)
        
        if(result)
            return true
        else
            return false
        }catch(error){
            return false
        }
}

//UPDATE
const updateClassificacao = async function (classificacao) {
    try {
        let sql = `update tbl_classificacao set 
                                            '${classificacao.faixa_etaria}',
                                            '${classificacao.link_icone_classificacao}'
        where id_classificacao = ${classificacao.id_classificacao}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

//DELETE
const deleteClassificacao = async function (id_classificacao) {
    try {
        let sql = `delete from tbl_classificacao where id_classificacao = ${id_classificacao}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

//SELECT
const selectClassificacao = async function () {
    try {
        //ScriptSQL para retornar todos os dados
        let sql = `select * from tbl_classificacao order by id_classificacao desc`
        
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

//SELECT BY ID
const selectByIdClassificacao = async function (classificacao) {
    try {
        //ScriptSQL para retornar todos os dados
        let sql = `select * from tbl_classificacao where id_classificacao = ${classificacao.id_classificacao}`
        
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

module.exports = {
    insertClassificacao,
    updateClassificacao,
    deleteClassificacao,
    selectClassificacao,
    selectByIdClassificacao
}