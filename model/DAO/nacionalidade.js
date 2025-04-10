/*******************************************************************************
 * Objetivo: Criar a comunicação com o banco de dados para fazer CRUD de naciona-
 * lidade
 * Data: 11/02/2025
 * Autor: Giovanna
 * Versão: 1.0
********************************************************************************/

//import da biblioteca prisma/client
const {PrismaClient} = require('@prisma/client')

//Instancia (criarr um objt a ser utilizado) a biblioteca do prisma/client
const prisma = new PrismaClient()

const insertNacionalidade = async function (nacionalidade) {
    try {   
        let sql = `insert to into tbl_nacionalidade (
                                                        
        )`
        
    } catch (error) {
        
    }
}


module.exports{

}