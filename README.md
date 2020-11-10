<h1 align="center">
  <img alt="Logo" src="https://res.cloudinary.com/eliasgcf/image/upload/v1588625369/GoBarber/logo_iw1v9f.svg" width="200px">
</h1>

<h3 align="center">
  GoBarber - API
</h3>

<p align="center">
  <a href="https://www.linkedin.com/in/gustavo-tatarem/" target="_blank" rel="noopener noreferrer">
    <img alt="Made by" src="https://img.shields.io/badge/made%20by-gustavo%20tatarem-%23FF9000">
  </a>
  
<img alt="GitHub top language" src="https://img.shields.io/github/languages/top/gustatarem/gostack-gobarber-backend?color=%23FF9000">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/gustatarem/gostack-gobarber-backend?color=%23FF9000">

  <a href="https://github.com/gustatarem/gostack-gobarber-backend/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/gustatarem/gostack-gobarber-backend?color=%23FF9000">
  </a>

  <img alt="GitHub" src="https://img.shields.io/github/license/gustatarem/gostack-gobarber-backenD?color=%23FF9000">
</p>

<p align="center">
  <a href="#-sobre-o-projeto">Sobre o projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-configurando-o-ambiente">Configurando o ambiente</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-rotas">Rotas</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-license">License</a>
</p>

<p align="center" id="insomniaButton">
	<a href="https://insomnia.rest/run/?label=GoBarber&uri=https%3A%2F%2Fgithub.com%2Fgustatarem%2Fgostack-gobarber-backend%2Fblob%2Fmaster%2FInsomnia.json" target="_blank"><img src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia"></a>
</p>

## 💇 Sobre o projeto

O GoBarber é uma aplicação de agendamentos em barbearias, onde os usuários podem realizar agendamentos com prestadores de serviço através do app mobile e os prestadores de serviço têm acesso à sua agenda de atendimentos através do sistema web.

Este repositório possui o código referente a parte backend da aplicação, onde está armazenada toda a lógica por trás desde a criação de uma conta até a realização de um agendamento.
 
Para acessar a **versão web**, clique aqui: [GoBarber Web](https://github.com/gustatarem/gostack-gobarber-web)
Para acessar a **versão mobile**, clique aqui: [GoBarber Mobile](https://github.com/gustatarem/appgobarber)
 
## 🚀 Tecnologias

Tecnologias utilizadas no desenvolvimento dessa api.

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/pt-br/)
- [Docker](https://www.docker.com/)
- [Multer](https://github.com/expressjs/multer)
- [TypeORM](https://typeorm.io/#/)
- [JWT-token](https://jwt.io/)
- [uuid v4](https://github.com/thenativeweb/uuidv4/)
- [PostgreSQL](https://www.postgresql.org/)
- [Date-fns](https://date-fns.org/)
- [Jest](https://jestjs.io/)
- [Eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [EditorConfig](https://editorconfig.org/)

## 💻 Configurando o ambiente

Importe o arquivo `Insomnia.json` no Insomnia ou clique no botão [Run in Insomnia](#insomniaButton)

### Pré-requisitos

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://classic.yarnpkg.com/) ou [npm](https://www.npmjs.com/)
- Uma instância do [PostgreSQL](https://www.postgresql.org/)

> :warning: Recomendo usar o Docker

Clone o repositório usando o `git` ou faça o download no formato zip. 


```bash
# Vá até a pasta do projeto
$ cd gostack-gobarber-backend

# Instale as dependências
$ yarn

# Faça uma cópia do arquivo '.env.example' para um arquivo '.env' e configure as SUAS variáveis ambiente.
$ cp .env.example .env

# Crie uma instância do PostgreSQL usando o Docker
$ docker run --name gobarber-postgres -e POSTGRES_USER=docker \
              -e POSTGRES_DB=gostack_gobarber -e POSTGRES_PASSWORD=docker \
              -p 5432:5432 -d postgres

# Crie uma instância do MongoDB usando o Docker
$ docker run --name gobarber-mongodb -p 27017:27017 -d -t mongo

# Crie uma instância do Redis usando o Docker
$ docker run --name gobarber-redis -p 6379:6379 -d -t redis:alpine

# Assim que os serviços estiverem funcionando, execute todas as migrations
$ yarn typeorm migration:run

# Para finalizar, execute o seguinte comando para executar o servidor em ambiente de desenvolvimento
$ yarn dev:server
```

## 🛣 Rotas

### :warning: Todas as rotas que possuem * logo após o path (ex: /users/avatar*) são rotas autenticadas, ou seja, necessitam do token de sessão do usuário como Bearer de autenticação:warning:

### Users

- **`POST /users`**: A rota recebe `name`, `email` e `password` dentro do corpo da requisição, sendo o `name` o nome do usuário a ser cadastrado. Ao cadastrar um novo cliente, ele é armazenado dentro do seu banco de dados e retorna-se o cliente criado. Ao cadastrar no banco de dados, a tabela `users` possuirá os campos `name`, `email`, `password`, `created_at`, `updated_at` e `avatar`.

- **`PATCH /users/avatar`***: Essa rota recebe dentro de um multipart form um item com name `avatar` e um arquivo (jpg ou png). Ao cadastrar um novo avatar, ele é armazenado dentro do seu banco de dados e retorna-se o objeto do usuário que teve seu avatar alterado.

#### Sessions

- **`POST /sessions`***: A rota recebe `email` e `password` dentro do corpo da requisição. Ao criar uma nova sessão o usuário recebe um token de autenticação que deve ser usado em todas as rotas autenticadas da aplicação.

#### Password

- **`POST /password/forgot`**: A rota recebe um `email` dentro do corpo da requisição. Ao fazer a requisição, é criado um token de 2h de validade na tabela `user_tokens` para que seja feito o tracking do usuário durante a recuperação de senha e o sistema de envio de e-mails (ethereal para ambiente de desenvolvimento e Amazon SES para ambiente de produção) gera uma mensagem de recuperação para o `email` informado na requisição com um link para o reset de senha. 

- **`POST /password/reset`**: A rota recebe `password`, `password_confirmation` e `token` dentro do corpo da requisição. Sendo `password` e `password_confirmation` a nova senha do usuário e o `token` o token gerado anteriormente na tabela `user_tokens` para garantir que o usuário que pediu a nova senha é o mesmo que está efetuando o reset. Ao fazer a requisição a senha do usuário é alterada na tabela `users` para a senha que foi passada no corpo da requisição.

### Profile

 - **`GET /profile`***: A rota retorna os dados de perfil do usuário autenticado.

 - **`PUT /profile/update`***: A rota possui 2 comportamentos, se receber apenas `name` e `email` a rota atualiza esses 2 dados do usuário autenticado na tabela `users`, porém se forem enviados também os campos `old_password` e `password` a rota também atualiza a senha do usuário autenticado na tabela `users`.

### Appointments

- **`POST /appointments`***: A rota você recebe no corpo da requisição o `provider_id` e uma data `date`, sendo o `provider_id` o id do prestador de serviço com quem o agendamento será marcado. Aqui é cadastrado na tabela `appointments` um novo agendamento, que estará relacionado ao `provider_id` informado e ao `user_id` do usuário autenticado.

#### Providers

- **`GET /providers`***: A rota lista todos os prestadores de serviço **menos** o usuário autenticado.

- **`GET /appointments/me`***: A rota lista todos os agendamentos marcados com o usuário autenticado.

- **`GET /provieders/:id/day-availability`***: A rota recebe `day`, `month` e `year` através dos *query params* e retorna um array de objetos contendo todas as horas de trabalho do dia `day` e uma flag (boolean) para dizer se o horário está disponível para agendamentos ou não. 

- **`GET /provieders/:id/month-availability`***: A rota recebe `month` e `year` através dos *query params* e retorna um array de objetos contendo todas os dias do mês `month` e uma flag (boolean) para dizer se o dia possui horários disponíveis para agendamentos ou não. 

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
