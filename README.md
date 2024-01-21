# Medicine management

Nesta API estarei fazendo um CRUD de gerenciamento de medicamentos.

Foram utilizadas as Tecnologias abaixo:
- Node: ambiente de execução do código Javascript
- Typescript: linguagem utilizada, o superset do Javascript
- NestJS: framework para estruturação de do código como um todo
- Prisma: TypeORM para manipulação do Banco de dados
- Docker: para criação do Container
- Docker Compose: para orquestração dos containers
- Postgres: Banco de dados relacional utilizado
- Dotenv: para utilizar as variáveis de ambiente
- Swagger: para documentacão do projeto
- Prettier e Eslint: para organização e padronização do código

## O que é necessário para iniciar o projeto?

Existem duas opções, via containers e localmente. Em ambas versões é extremamente necessário que o projeto possua um arquivo .env entao crie baseado no template da raiz do projeto `env.example` e preencha os dados com o arquivo enviado.


### Docker container:
- Necessário: Docker e Docker Compose.
- Necessário a criação do diretório `database` na raiz do projeto para ser o armazenamento do banco de dados.

#### Apenas Docker:

Para inicialização crie uma rede docker med_network com o comando:

> docker network create med_network

Em seguida, crie um container Postgresql em sua ultima versão com este comando, referenciando a rede criada:

> docker run -d --name database_med --network med_network --env-file .env -p 5432:5432 postgres:latest

Agora, crie a imagem da API com o comando no seu terminal: 

> docker run build -t med_image_api .

Basta rodar o ultimo comando para criar a conexão na mesma rede entre a API e o banco de dados:

> docker run -d --name med_api --network med_network --env-file .env -p 8080:8080 med_image_api

- O projeto estara alocado na porta 8080 e acessivel pela rota http://localhost:8080

### Docker compose:

Para incializacão com Docker Compose e muito simples, basta rodar este unico comando:

> docker-compose up -d

Não esqueca de preencher a env.

- O projeto estara alocado na porta 8080 e acessivel pela rota http://localhost:8080

### Localmente:

- Necessario: [NodeJS](https://nodejs.org/en), [postgresql](https://www.postgresql.org/) e [Dbeaver](https://dbeaver.io/) (recomendado).

- Abra o DBeaver e realize os seguintes passos:
> Clique em "Banco de Dados" e escolha "Postgresql" e selecione "Proximo".

> Entre com os dados de conexão passados no .env

- No terminal na raiz do projeto, instale as dependencias do projeto com este comando:

> npm i

- Agora realize as migracoes do Prisma com o comando abaixo:
  
> npx prisma migrate dev --name init

- Apos ter realizado todas as migracoes, realize o 'seed' para criar o usuario 'admin' que sera necessario para autenticacao e acesso as demais rotas do projeto:

> npm run seed

- Inicie o projeto com este comando:

> npm run start

- O projeto estara alocado na porta 8080 e acessivel pela rota http://localhost:8080

## Documentacão

Acesse a rota: http://localhost:8080/api