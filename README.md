# Projeto Store Manager

Olá, seja bem vindo ao repositório do projeto **Store Manager**, esse projeto foi desenvolvido por mim [Guilherme Artigas](https://www.linkedin.com/in/guilherme-artigas/) de forma individual enquanto aluno da [Trybe](https://www.betrybe.com/), no módulo de back-end do curso.

Foi um desafio que tivemos 5 dias para desenvolver do zero uma API para gerenciamento de uma loja, que manipulava 2 rotas e 3 tabelas do banco de dados, aplicando padrões arquiteturais e conhecimentos em **REST**, totalmente coberta com testes unitários, para garantir a saúde da aplicação.

#### Algumas características da API
- endpoint para listar produtos método `GET` rota `/products`;
- endpoint para cadastrar produtos método `POST` na rota `/products`;
  - Os produtos enviados são salvos na tabela products do banco de dados
  - O corpo da requisição deve ser em formato JSON seguindo a seguinte estrutura:
  ```json
    {
      "name": "Produto exemplo"
    }
  ```
  - Se o produto foi cadastrado com sucesso o retorno é um status **http 201**, no seguinte formato:
  ```json
    {
      "id": 4,
      "name": "Produto exemplo",
    }
  ```
  - Existem validações nessa rota para que os produtos sejam obrigatoriamente cadastrados com name maior ou igual a 5 caracteres.

<br />

- endpoint para cadastrar vendas através do método `POST` na rota `/sales`;
  - As vendas cadastradas são salvas na tabela sales do banco de dados
  - O corpo da requisição deve ser em formato JSON seguindo a seguinte estrutura:
  ```json
    [
      {
        "productId": 1,
        "quantity": 10,
      },
      {
        "productId": 2,
        "quantity": 3,
      },
    ]
  ```
  - Se a requisição não tiver o campo name, o resultado retornado é um status **http 400**: `{ "message": '"name" is required' }`
  - Se a requisição não tiver name com pelo menos 5 caracteres, o resultado retornado é um status **http 422**: `{ "message": '"name" length be at least 5 characters long' }`

<br />

- endpoint para cadastrar vendas método `POST` rota `/sales`
  - Se algum dos itens da requisição não tiver o campo productId, o resultado retornado é um status **http 400**: `{ "message": '"productId" is required' }`
  - Se algum dos itens da requisição não tiver o campo quantity, o resultado retornado é um status **http 400**: `{ "message": '"quantity" is required' }`
  - Se a requisição tiver algum item em que o campo quantity seja menor ou igual a zero, o resultado retornado é um status **http 422**: `{ "message": '"quantity" must be greater than or equal to 1' }`
  - Se o campo productId do item da requisição não existir no banco de dados, o resultado retornado é um status **http 404**: `{ "message": '"Product not found"' }`
  - Em casos de cadastro de vendas com sucesso o retorno é um status **http 201**.

<br />

- endpoint para listar vendas método `GET` rota `/sales` e `/sales/:id`
  - É possível listar todas as vendas;
  - É possível listar todas as vendas passando um `id`;

## Tecnologias utilizadas no desenvolvimento 👨🏼‍💻

![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)
![Mocha](https://img.shields.io/badge/mocha.js-323330?style=for-the-badge&logo=mocha&logoColor=Brown)
![Git](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white)

## Passo a Passo para rodar o projeto localmente na sua máquina

## Passo 1 - Clone o repositório com o comando...
> `git clone git@github.com:Guilherme-Artigas/Store_Manager.git && cd Store_Manager`

É necessário ter o docker e o docker compose instalados!

- Verifique se o docker está instalado com o comando `docker --version` 
- Verifique se o docker compose está instalado com o comando `docker-compose --version`

## Passo 2 - Instalar as dependências do projeto com o comando...
> `npm install`

## Passo 3 - Renomear o arquivo .env-example para .env

## Passo 4 - Subindo os containers necessários com o comando...
> `docker-compose up -d`

## Passo 5 - Criar e popular o banco de dados com o comando...
> `npm run migration && npm run seed`

## Passo 6 - Entrando no terminal interativo do container docker com o comando...
> `docker exec -it store_manager bash`

## Passo 7 - Subindo o servidor com o comando...
> `npm run debug`

Pronto! Com o servidor rodando na porta 3000 é possível testar requisições do tipo GET, POST, PUT, DELETE, através de um cliente como o [thunder client](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client) por exemplo.

Obrigado pela visita!
