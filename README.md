# PokéAPI

Este projeto é uma API RESTful construída com NestJS e SQLite com o objetivo de gerenciar treinadores, seus times e os pokémons associados. Ele possui integração com a PokéAPI oficial para validação e enriquecimento de dados dos pokémons, e respeita limites de regras de negócio como quantidade máxima de pokémons por time.


## 🚀 Tecnologias Utilizadas

- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [SQLite](https://www.sqlite.org/index.html)
- [Docker](https://www.docker.com/)
- [PokéAPI](https://pokeapi.co/)
- [Axios](https://axios-http.com/)
- [class-validator](https://github.com/typestack/class-validator)



## ✅ Pré-requisitos

- Docker instalado e funcionando
- Yarn instalado globalmente
- (Opcional) Node.js para rodar localmente sem Docker



## 📦 Como Rodar o Projeto

```bash
# 1. Clone o repositório
git clone https://github.com/jaovw/leany-api.git
cd leany-api

# 2. Suba a aplicação com Docker
docker-compose up --build

# 2.1 Caso não tenha o Docker instalado
yarn
yarn start:dev

# 3. Acesse a aplicação
http://localhost:3000
```



## 📁 Estrutura do Projeto

    ├── src
    │   ├── database
    │   │   ├── db.sqlite
    │   ├── trainer
    │   │   ├── trainer.controller.ts
    │   │   ├── trainer.service.ts
    │   │   ├── trainer.entity.ts
    │   │   ├── dto/
    │   ├── team
    │   │   ├── team.controller.ts
    │   │   ├── team.service.ts
    │   │   ├── team.entity.ts
    │   │   ├── dto/
    │   ├── team-pokemon
    │   │   ├── team-pokemon.controller.ts
    │   │   ├── team-pokemon.service.ts
    │   │   ├── team-pokemon.entity.ts
    │   │   ├── dto/
    │   ├── app.module.ts
    │   └── main.ts
    ├── docker-compose.yml
    └── Dockerfile



## 🔗 Endpoints Disponíveis

> Todas as requisições que recebem dados utilizam **validações com `class-validator`**, garantindo integridade e segurança dos dados.

### 👤 Treinadores

- **GET /trainers** — Lista todos
- **GET /trainers/:id** — Detalha um treinador
- **POST /trainers** — Cria um treinador
- **PUT /trainers/:id** — Atualiza
- **DELETE /trainers/:id** — Remove

### 🛡 Times

- **GET /teams** — Lista todos os times
- **GET /teams/:id** — Detalha
- **POST /teams** — Cria um time para um treinador
- **PUT /teams/:id** — Atualiza
- **DELETE /teams/:id** — Remove

### ⚡ Pokémons de Time

- **POST /team-pokemons/team/:teamId** — Adiciona um pokémon a um time
  - Valida se o Pokémon existe na PokéAPI
  - Respeita o limite de 6 pokémons por time
- **GET /team-pokemons/team/:teamId** — Lista os pokémons de um time com enriquecimento (nome, tipos e sprite da PokéAPI)
- **DELETE /team-pokemons/:id** — Remove um pokémon de um time



## 📚 Documentação

Esta API utiliza o Swagger (OpenAPI) para documentar todos os seus endpoints de forma interativa e automática.

A documentação está disponível após subir o projeto em:

**[http://localhost:3000/api](http://localhost:3000/api)**

Através dessa interface você poderá:

- Navegar por todos os endpoints (GET, POST, PUT, DELETE)
- Visualizar os schemas de dados utilizados nos corpos de requisição (`body`) e respostas
- Ver exemplos de payloads esperados
- Testar as requisições diretamente do navegador

### 🔍 Detalhes técnicos da documentação

- Todos os **DTOs** estão anotados com `@ApiProperty` para que os parâmetros de entrada sejam exibidos corretamente
- Os **Controllers** estão anotados com:
  - `@ApiTags` para agrupar endpoints por entidade
  - `@ApiOperation` para descrever cada ação
  - `@ApiResponse` para indicar os códigos HTTP esperados
  - `@ApiBody` para mostrar os payloads esperados em requisições do tipo `POST` e `PUT`
- A documentação é gerada automaticamente a partir do código fonte, garantindo sempre consistência com a implementação



## 🧩 Estrutura do Banco de Dados

O banco de dados utilizado é o SQLite (`db.sqlite`) e está configurado no root do projeto.
### Regras

- Um **treinador** pode ter vários **times**
- Um **time** pode ter até **6 pokémons**
- Um mesmo **pokémon** pode existir em diferentes **times**

