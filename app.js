/*
 * Objetivo: Criar um API para realizar o CRUD do sistema de controle de filmes
 * Autor: Giovanna
 * OBSERVAÇÃO:
 *      Para criar a API precisamos instalar:
 *          * express           npm install express --save
 *          * cors              npm install cors --save
 *          * body-parser       npm install body-parser --save  -> Pegar dados do front 
 *
 *      Para criar a integração com o Banco de Dados precisamos instalar:
 *          * prisme            npm install prisma --save           (para fazer conexão com o BD)
 *          * prisma/client     npm install @prisma/client --save   (para rodar os scripts SQL)
 * 
 *      Após a instalação do prisma e prisma client, devemos:
 *          * npx prisma migrate dev -> sincronismo, começo com o bd vazio
 * 
 *      Após criar os arquivos -> configure o schema.prisma (ex: bd)
 *      E env arquivo para conectar com bd -> configurar url, nome db, senha, porta...
 *      Após rode esse comando:
 *          * npx prisma init -> para poder rodar comando/ start prisma
*/

const express = require ('express')
const cors = require ('cors')
const bodyParser = require ('body-parser')

//Manipular o body(dados do front) da requisição para chegar só JSON
const bodyParserJSON = bodyParser.json()

//Cria o objeto app com referencias do express
const app = express()

//Config de acesso do CORS para a API
app.use((request, response, next)=>{
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    app.use(cors())
    next()
})

const controllerFilme = require('./controller/filme/controllerFilme')

app.post('/v1/controle-filmes/filme', cors(), bodyParserJSON, async function(request, response) {

    //Recebe o content type da requisição
    let contentType = request.headers['content-type']

    //Recebe do body da requisição os dados encaminhados
    let dadosBody = request.body   

    let resultFilme = await controllerFilme.inserirFilme(dadosBody, contentType)

    response.status(resultFilme.status_code)
    response.json(resultFilme)
})

app.listen('3030', function(){
    console.log('API funcionando...')
})