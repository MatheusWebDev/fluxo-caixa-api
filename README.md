# Fluxo Caixa API

- [Fluxo Caixa API](#fluxo-caixa-api)
  - [Sobre Projeto](#sobre-projeto)
  - [Comandos básicos](#comandos-básicos)
    - [Servir aplicação](#servir-aplicação)
    - [Geração da documentação](#geração-da-documentação)
    - [Geração das chaves de segurança](#geração-das-chaves-de-segurança)
  - [Autenticação](#autenticação)
  - [API Docs](#configuração-exemplo-do-proxy-reverso)

## Sobre Projeto

O Fluxo Caixa API é um serviço para resgistrar as transações (créditos e debitos) que ocorrem no dia a dia de um comerciante e informar um resumo consolidado do saldo final do dia.

Este projeto é feito em Node.js com JavaScript e utiliza o framework [Express.js](https://expressjs.com/pt-br/).

## Comandos básicos

### Servir Aplicação

Execute `npm install` para instalar as dependências do projeto.

Execute `npm run dev` para servir a aplicação localmente (utiliza [nodemon](https://nodemon.io/) para restart servidor durante desenvolvimento local). O projeto roda em localhost na porta 8302 [http://localhost:8302/](http://localhost:8302/)

Execute `npm start` para servir a aplicação no ambiente do servidor. O projeto roda na porta que estiver mapeada a variavel de ambiente do servidor `PORT_INDEX`, caso não encontrado, será usado a porta padrão **8302**.

### Geração da Documentação

Execute `npm run swagger-autogen` para gerar um novamente a documentação da API.

### Geração das Chaves de Segurança

Execute `npm run generate-keypair` para gerar uma nova chave privada/publica para encriptar o token JWT. Depois de gerado é importante mover a chave privada para outro lugar no servidor que a aplicação apenas a acesse.

## Autenticação

O projeto conta com autenticação via token JWT, ou seja, é necessário cadastrar um usuário, logar com esse usuário e enviar no cabeçalho da requisição, o Bearer Token que é retornado do serviço de login, para ter acesso as rotas protegidas.

## API Docs

O projeto conta com Swagger para documentar os endpoits da API. Ao rodar o projeto, é possivel acessar a documentação da API em [/api/docs](http://localhost:8302/api/docs)
