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


const controllerClassificacao = require('./controller/classificacao/controllerClassificacao')
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

const controllerGenero = require('./controller/genero/controllerGenero')
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

const controllerLinguagem = require('./controller/linguagem/controllerLinguagem')
app.post('/v1/controle-filmes/linguagem', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type']
    
    let dadosBody = request.body

    let resultLinguagem = await controllerLinguagem.inserirLinguagem(dadosBody, contentType)

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

    response.status(resultLinguagem.status_code)
    response.json(resultLinguagem)
})

const controllerNacionalidade = require('./controller/nacionalidade/controllerNacionalidade')
app.post('/v1/controle-filmes/nacionalidade', cors(), bodyParserJSON, async function(request, response) {
    let dadosBody = request.body
    let contentType = request.headers['content-type']
    let resultNacionalidade = await controllerNacionalidade.inserirNacionalidade(dadosBody,contentType)

    response.status(resultNacionalidade.status_code)
    response.json(resultNacionalidade)
})
app.get('/v1/controle-filmes/nacionalidade', cors(), bodyParserJSON, async function(request, response) {
    let resultNacionalidade = await controllerNacionalidade.listarNacionalidade()

    response.status(resultNacionalidade.status_code)
    response.json(resultNacionalidade)
})
app.get('/v1/controle-filmes/nacionalidade/:id', cors(), bodyParserJSON, async function(request, response) {
    let idNacionalidade = request.params.id
    let resultNacionalidade = await controllerNacionalidade.buscarNacionalidade(idNacionalidade)

    response.status(resultNacionalidade.status_code)
    response.json(resultNacionalidade)
})
app.delete('/v1/controle-filmes/nacionalidade/:id', cors(), bodyParserJSON, async function(request, response) {
    let idNacionalidade = request.params.id
    let resultNacionalidade = await controllerNacionalidade.excluirNacionalidade(idNacionalidade)

    response.status(resultNacionalidade.status_code)
    response.json(resultNacionalidade)
})
app.put('/v1/controle-filmes/nacionalidade/:id', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type']

    let idNacionalidade = request.params.id

    let dadosBody = request.body
    
    let resultNacionalidade = await controllerNacionalidade.atualizarNacionalidade(idNacionalidade, dadosBody, contentType)

    response.status(resultNacionalidade.status_code)
    response.json(resultNacionalidade)
})

const controllerPlataforma = require('./controller/plataforma/controllerPlataforma')
app.post('/v1/controle-filmes/plataforma', cors(), bodyParserJSON, async function(request, response) {
    let dadosBody = request.body
    let contentType = request.headers['content-type']
    let resultPlataforma = await controllerPlataforma.inserirPlataforma(dadosBody,contentType)

    response.status(resultPlataforma.status_code)
    response.json(resultPlataforma)
})
app.get('/v1/controle-filmes/plataforma', cors(), bodyParserJSON, async function(request, response) {
    let resultPlataforma = await controllerPlataforma.listarPlataforma()

    response.status(resultPlataforma.status_code)
    response.json(resultPlataforma)
})
app.get('/v1/controle-filmes/plataforma/:id', cors(), bodyParserJSON, async function(request, response) {
    let idPlataforma = request.params.id
    let resultPlataforma = await controllerPlataforma.buscarPlataforma(idPlataforma)

    response.status(resultPlataforma.status_code)
    response.json(resultPlataforma)
})
app.delete('/v1/controle-filmes/plataforma/:id', cors(), bodyParserJSON, async function(request, response) {
    let idPlataforma = request.params.id
    let resultPlataforma = await controllerPlataforma.excluirPlataforma(idPlataforma)

    response.status(resultPlataforma.status_code)
    response.json(resultPlataforma)
})
app.put('/v1/controle-filmes/plataforma/:id', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type']

    let idPlataforma = request.params.id

    let dadosBody = request.body
    
    let resultPlataforma = await controllerPlataforma.atualizarPlataforma(idPlataforma, dadosBody, contentType)

    response.status(resultPlataforma.status_code)
    response.json(resultPlataforma)
})

const controllerSexo = require('./controller/sexo/controllerSexo')
app.post('/v1/controle-filmes/sexo', cors(), bodyParserJSON, async function(request, response) {
    let dadosBody = request.body
    let contentType = request.headers['content-type']
    let resultSexo = await controllerSexo.inserirSexo(dadosBody, contentType)

    response.status(resultSexo.status_code)
    response.json(resultSexo)
})
app.get('/v1/controle-filmes/sexo', cors(), bodyParserJSON, async function(request, response) {
    let resultSexo = await controllerSexo.listarSexo()

    response.status(resultSexo.status_code)
    response.json(resultSexo)
})
app.get('/v1/controle-filmes/sexo/:id', cors(), bodyParserJSON, async function(request, response) {
    let idSexo = request.params.id
    let resultSexo = await controllerSexo.buscarSexo(idSexo)

    response.status(resultSexo.status_code)
    response.json(resultSexo)
})
app.delete('/v1/controle-filmes/sexo/:id', cors(), bodyParserJSON, async function(request, response) {
    let idSexo = request.params.id
    let resultSexo = await controllerSexo.excluirSexo(idSexo)

    response.status(resultSexo.status_code)
    response.json(resultSexo)
})
app.put('/v1/controle-filmes/sexo/:id', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type']

    let idSexo = request.params.id

    let dadosBody = request.body
    
    let resultSexo = await controllerSexo.atualizarSexo(idSexo, dadosBody, contentType)

    response.status(resultSexo.status_code)
    response.json(resultSexo)
})

const controllerTipoPremiacao = require('./controller/tipoPremiacao/controllerTipoPremiacao')
app.post('/v1/controle-filmes/tipopremiacao', cors(), bodyParserJSON, async function(request, response) {
    let dadosBody = request.body
    let contentType = request.headers['content-type']
    let resultTipoPremiacao = await controllerTipoPremiacao.inserirTipoPremiacao(dadosBody,contentType)

    response.status(resultTipoPremiacao.status_code)
    response.json(resultTipoPremiacao)
})
app.get('/v1/controle-filmes/tipopremiacao', cors(), bodyParserJSON, async function(request, response) {
    let resultTipoPremiacao = await controllerTipoPremiacao.listarTipoPremicao()

    response.status(resultTipoPremiacao.status_code)
    response.json(resultTipoPremiacao)
})
app.get('/v1/controle-filmes/tipopremiacao/:id', cors(), bodyParserJSON, async function(request, response) {
    let idTipoPremiacao = request.params.id
    let resultTipoPremiacao = await controllerTipoPremiacao.buscarTipoPremiacao(idTipoPremiacao)

    response.status(resultTipoPremiacao.status_code)
    response.json(resultTipoPremiacao)
})
app.delete('/v1/controle-filmes/tipopremiacao/:id', cors(), bodyParserJSON, async function(request, response) {
    let idTipoPremiacao = request.params.id
    let resultTipoPremiacao = await controllerTipoPremiacao.excluirTipoPremiacao(idTipoPremiacao)

    response.status(resultTipoPremiacao.status_code)
    response.json(resultTipoPremiacao)
})
app.put('/v1/controle-filmes/tipopremiacao/:id', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type']

    let idTipoPremiacao = request.params.id

    let dadosBody = request.body
    
    let resultTipoPremiacao = await controllerTipoPremiacao.atualizarTipoPremiacao(idTipoPremiacao, dadosBody, contentType)

    response.status(resultTipoPremiacao.status_code)
    response.json(resultTipoPremiacao)
})

const controllerPremiacao = require('./controller/tipoPremiacao/controllerPremiacao')
app.post('/v1/controle-filmes/premiacao', cors(), bodyParserJSON, async function(request, response) {
    let dadosBody = request.body
    let contentType = request.headers['content-type']
    let resultPremiacao = await controllerPremiacao.inserirPremiacao(dadosBody, contentType)

    response.status(resultPremiacao.status_code)
    response.json(resultPremiacao)
})
app.get('/v1/controle-filmes/premiacao', cors(), bodyParserJSON, async function(request, response) {
    let resultPremiacao = await controllerPremiacao.listarPremicao()

    response.status(resultPremiacao.status_code)
    response.json(resultPremiacao)
})

const controllerAtor = require('./controller/ator/controllerAtor.js')
app.post('/v1/controle-filmes/ator', cors(), bodyParserJSON, async function(request, response) {
    let dadosBody = request.body
    let contentType = request.headers['content-type']
    let resultAtor = await controllerAtor.inserirAtor(dadosBody, contentType)

    response.status(resultAtor.status_code)
    response.json(resultAtor)
})
app.get('/v1/controle-filmes/ator', cors(), bodyParserJSON, async function(request, response) {
    let resultAtor = await controllerAtor.listarAtor()

    response.status(resultAtor.status_code)
    response.json(resultAtor)
})

app.listen('3030', function(){
    console.log('API funcionando...')
})