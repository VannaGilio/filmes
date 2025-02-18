/***********************************************************************************
 * Objetivo: Arquivo de configuração para padronizar mensagens e status code da API
 * Data: 18/02/2025/
 * Autor: Giovanna 
 * Versão 1.0
************************************************************************************/

//Status code de mensagens de erro
const ERROR_REQUIRED_FIELDS = {status: false, status_code: 400, message: "Não foi possivel realizar a requisisção, pois existem campos obrigatorios que não foram preenchidos ou não atendem a quantidade de caracteristicas"}

const ERROR_INTERNAL_SERVER = {status: false, status_code: 500, message: "Devido a erros internos no servidor, não foi possivel processar a requisição!!!"}

//Status code de mensagens de sucesso
const SUCCESS_CREATED_ITEM = {status: true, status_code: 201, message: "Item criado com sucesso!!!"}

module.exports = {
    ERROR_REQUIRED_FIELDS,
    ERROR_INTERNAL_SERVER,
    SUCCESS_CREATED_ITEM        
}