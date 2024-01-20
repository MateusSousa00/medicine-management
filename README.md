# Medicine management

Nesta API estarei fazendo um CRUD de gerenciamento de medicamentos.

Foram utilizadas as Tecnologias abaixo:
- Node: ambiente de execução do código Javascript
- Typescript: linguagem utilizaad, o superset do Javascript
- NestJS: framework para estruturacao de do codigo como um todo
- Prisma: TypeORM para manipulacao do Banco de dados
- Docker: para criação do Container
- Docker Compose: para orquestração dos containers
- Postgres: Banco de dados relacional utilizado
- Dotenv: para utilizar as variáveis de ambiente
- Swagger: para documentacao do projeto
- Prettier: para organização e padronização do codigo

## O que e necessario para iniciar o projeto?

Existem duas opcoes, via containers e localmente. Em ambas versoes e extremamente necessario que o projeto possua um arquivo .env entao crie baseado no template da raiz do projeto e preencha os dados com o arquivo enviado.

### Docker container:
- Necessario: Docker e Docker Compose.

#### Apenas Docker:

Para inicializacao crie uma rede med_network com o comando:

> docker network create med_network

Em seguida, crie um container Postgresql em sua ultima versao com este comando, referenciando a network criada:

> docker run -d --name database_med --network med_network --env-file .env -p 5432:5432 postgres:latest

Agora, crie a imagem da API com o comando no seu terminal: 

> docker run build -t med_image_api .

Basta rodar o ultimo comando para criar a conexao na mesma network entre a API e o banco de dados:

> docker run -d --name med_api --network med_network --env-file .env -p 8080:8080 med_image_api

- O projeto estara alocado na porta 8080 e acessivel pela rota http://localhost:8080

### Docker compose:

Para incializacao com Docker Compose e muito simples, basta rodar este unico comando:

> docker-compose up -d

Nao esqueca de preencher a env.

- O projeto estara alocado na porta 8080 e acessivel pela rota http://localhost:8080

### Localmente:

- Necessario: [NodeJS](https://nodejs.org/en), [postgresql](https://www.postgresql.org/) e [Dbeaver](https://dbeaver.io/) (recomendado).

- Abra o DBeaver e realize os seguintes passos:
> Clique em "Banco de Dados" e escolha "Postgresql" e selecione "Proximo".

> Entre com os dados de conexao passados no .env

- No terminal na raiz do projeto, instale as dependencias do projeto com este comando:
  
> npx prisma migrate dev --name init

- Apos ter realizado todas as migracoes, inicie o projeto com este comando:

> npm run start

- O projeto estara alocado na porta 8080 e acessivel pela rota http://localhost:8080

## Documentacao

Acesse a rota http://localhost:8080/api