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
app.get('/v1/controle-filmes/filme', cors(), async function(request, response){
    //Chama a função para retornar os filmes
    let resultFilme = await controllerFilme.listarFilme()

    response.status(resultFilme.status_code)
    response.json(resultFilme)
})
app.get('/v1/controle-filmes/filme/:id', cors(), async function (request, response){
    //recebe o id da requisição
    let idFilme = request.params.id
    let resultFilme = await controllerFilme.buscarFilme(idFilme)

    response.status(resultFilme.status_code)
    response.json(resultFilme)
})
app.delete('/v1/controle-filmes/filme/:id', cors(), async function (request, response){
    let idFilme = request.params.id
    let resultFilme = await controllerFilme.excluirFilme(idFilme)

    response.status(resultFilme.status_code)
    response.json(resultFilme)
})
app.put('/v1/controle-filmes/filme/:id', cors(), bodyParserJSON, async function (request, response){
   
    //recebe o content-type da requisição
    let contentType = request.headers['content-type']
   
    //recebe o id da requisição
    let idFilme = request.params.id

    //recebe os dados da requisição
    let dadosBody = request.body

    let resultFilme = await controllerFilme.atualizarFilme(idFilme, dadosBody, contentType)

    response.status(resultFilme.status_code)
    response.json(resultFilme)
})


const controllerClassificacao = require('./controller/filme/controllerClassificacao')
app.post('/v1/controle-filmes/classificacao', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type']

    let dadosBody = request.body

    let resultClassificacao = await controllerClassificacao.inserirClassificacao(dadosBody, contentType)

    response.status(resultClassificacao.status_code)
    response.json(resultClassificacao)
})
app.get('/v1/controle-filmes/classificacao', cors(), bodyParserJSON, async function(request, response) {
    let resultClassificacao = await controllerClassificacao.listarClassificacao()

    response.status(resultClassificacao.status_code)
    response.json(resultClassificacao)
})
app.get('/v1/controle-filmes/classificacao/:id', cors(), bodyParserJSON, async function(request, response) {
    let idClassificacao = request.params.id
    let resultClassificacao = await controllerClassificacao.buscarClassificacao(idClassificacao)

    response.status(resultClassificacao.status_code)
    response.json(resultClassificacao)
})
app.delete('/v1/controle-filmes/classificacao/:id', cors(), bodyParserJSON, async function(request, response) {
    let idClassificacao = request.params.id
    let resultClassificacao = await controllerClassificacao.excluirClassificacao(idClassificacao)

    response.status(resultClassificacao.status_code)
    response.json(resultClassificacao)
})
app.put('/v1/controle-filmes/classificacao/:id', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type']

    let idClassificacao = request.params.id

    let dadosBody = request.body
    
    let resultClassificacao = await controllerClassificacao.atualizarClassificacao(idClassificacao, dadosBody, contentType)

    response.status(resultClassificacao.status_code)
    response.json(resultClassificacao)
})

const controllerGenero = require('./controller/filme/controllerGenero')
app.post('/v1/controle-filmes/genero', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type']

    let dadosBody = request.body

    let resultGenero = await controllerGenero.inserirGenero(dadosBody, contentType)

    response.status(resultGenero.status_code)
    response.json(resultGenero)
})
app.get('/v1/controle-filmes/genero', cors(), bodyParserJSON, async function(request, response) {
    let resultGenero = await controllerGenero.listarGenero()

    response.status(resultGenero.status_code)
    response.json(resultGenero)
})
app.get('/v1/controle-filmes/genero/:id', cors(), bodyParserJSON, async function(request, response) {
    let idGenero = request.params.id
    let resultGenero = await controllerGenero.buscarGenero(idGenero)

    response.status(resultGenero.status_code)
    response.json(resultGenero)
})
app.delete('/v1/controle-filmes/genero/:id', cors(), bodyParserJSON, async function(request, response) {
    let idGenero = request.params.id
    let resultGenero = await controllerGenero.excluirGenero(idGenero)

    response.status(resultGenero.status_code)
    response.json(resultGenero)
})
app.put('/v1/controle-filmes/genero/:id', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type']

    let idGenero = request.params.id

    let dadosBody = request.body

    let resultGenero = await controllerGenero.atualizarGenero(idGenero, contentType, dadosBody)

    response.status(resultGenero.status_code)
    response.json(resultGenero)
})

const controllerLinguagem = require('./controller/filme/controllerLinguagem')
app.post('/v1/controle-filmes/linguagem', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type']
    
    let dadosBody = request.body

    let resultLinguagem = await controllerLinguagem.inserirLinguagem(contentType, dadosBody)

    response.status(resultLinguagem.status_code)
    response.json(resultLinguagem)
})
app.get('/v1/controle-filmes/linguagem', cors(), bodyParserJSON, async function(request, response) {
    let resultLinguagem = await controllerLinguagem.listarLinguagem()

    response.status(resultLinguagem.status_code)
    response.json(resultLinguagem)
})
app.get('/v1/controle-filmes/linguagem/:id', cors(), bodyParserJSON, async function(request, response) {
    let idLinguagem = request.params.id

    let resultLinguagem = await controllerLinguagem.buscarLinguagem(idLinguagem)

    response.status(resultLinguagem.status_code)
    response.json(resultLinguagem)
})
app.delete('/v1/controle-filmes/linguagem/:id', cors(), bodyParserJSON, async function(request, response) {
    let idLinguagem = request.params.id
    let resultLinguagem = await controllerLinguagem.excluirLinguagem(idLinguagem)

    response.status(resultLinguagem.status_code)
    response.json(resultLinguagem)
})
app.put('/v1/controle-filmes/linguagem/:id', cors(), bodyParserJSON, async function(request, response) {
    let dadosBody = request.body

    let contentType = request.headers['content-type']

    let idLinguagem = request.params.id

    let resultLinguagem = await controllerLinguagem.atualizarLinguagem(idLinguagem, contentType, dadosBody)
})

const controllerNacionalidade = require('./controller/filme/controllerNacionalidade')
app.post('/v1/controle-filmes/nacionalidade', cors(), bodyParserJSON, async function(request, response) {})
app.get('/v1/controle-filmes/nacionalidade', cors(), bodyParserJSON, async function(request, response) {})
app.get('/v1/controle-filmes/nacionalidade/:id', cors(), bodyParserJSON, async function(request, response) {})
app.delete('/v1/controle-filmes/nacionalidade/:id', cors(), bodyParserJSON, async function(request, response) {})
app.put('/v1/controle-filmes/nacionalidade/:id', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type']

    let idNacionalidade = request.params.id

    let dadosBody = request.body
    
    let resultNacionalidade = await controllerNacionalidade.atualizarNacionalidade(idNacionalidade, dadosBody, contentType)

    response.status(resultNacionalidade.status_code)
    response.json(resultNacionalidade)
})

const controllerPlataforma = require('./controller/filme/controllerPlataforma')
app.post('/v1/controle-filmes/plataforma', cors(), bodyParserJSON, async function(request, response) {})
app.get('/v1/controle-filmes/plataforma', cors(), bodyParserJSON, async function(request, response) {})
app.get('/v1/controle-filmes/plataforma/:id', cors(), bodyParserJSON, async function(request, response) {})
app.delete('/v1/controle-filmes/plataforma/:id', cors(), bodyParserJSON, async function(request, response) {})
app.put('/v1/controle-filmes/plataforma/:id', cors(), bodyParserJSON, async function(request, response) {})

const controllerSexo = require('./controller/filme/controllerSexo')
app.post('/v1/controle-filmes/sexo', cors(), bodyParserJSON, async function(request, response) {})
app.get('/v1/controle-filmes/sexo', cors(), bodyParserJSON, async function(request, response) {})
app.get('/v1/controle-filmes/sexo/:id', cors(), bodyParserJSON, async function(request, response) {})
app.delete('/v1/controle-filmes/sexo/:id', cors(), bodyParserJSON, async function(request, response) {})
app.put('/v1/controle-filmes/sexo/:id', cors(), bodyParserJSON, async function(request, response) {})

const controllerTipoPremiacao = require('./controller/filme/controllerTipoPremiacao')
app.post('/v1/controle-filmes/tipopremiacao', cors(), bodyParserJSON, async function(request, response) {})
app.get('/v1/controle-filmes/tipopremiacao', cors(), bodyParserJSON, async function(request, response) {})
app.get('/v1/controle-filmes/tipopremiacao/:id', cors(), bodyParserJSON, async function(request, response) {})
app.delete('/v1/controle-filmes/tipopremiacao/:id', cors(), bodyParserJSON, async function(request, response) {})
app.put('/v1/controle-filmes/tipopremiacao/:id', cors(), bodyParserJSON, async function(request, response) {})

app.listen('3030', function(){
    console.log('API funcionando...')
})