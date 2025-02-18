/*
 * Objetivo: Criar um API para realizar o CRUD do sistema de controle de filmes
 * Autor: Giovanna
 * OBSERVAÇÃO:
 *      Para criar a API precisamos instalar:
 *          * express           npm install express --save
 *          * cors              npm install cors --save
 *          * body-parser       npm install body-parser --save
 *
 *      Para criar a integração com o Banco de Dados precisamos instalar:
 *          * prisme            npm install prisma --save           (para fazer conexão com o BD)
 *          * prisma/client     npm install @prisma/client --save   (para rodar os scripts SQL)
*/

const express = require ('express')
const cors = require ('cors')
const bodyParser = require ('body-parser')

const app = express()


