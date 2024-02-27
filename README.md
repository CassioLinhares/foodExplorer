# ![Logo do Food Explorer](https://i.imgur.com/fk0Vker.png) 

Food Explorer é uma API para um restaurante fictício, que oferece funcionalidades de cardápio digital e gerenciamento de pedidos favoritos.

## 📁 Projeto

O projeto Food Explorer consiste em uma aplicação de cardápio digital para um restaurante fictício, desenvolvido como parte do desafio final do programa Explorer da Rocketseat.

O backend do projeto, responsável pela lógica e armazenamento dos dados, está disponível neste repositório. O frontend, que trata da interface do usuário, está disponível [aqui](link_para_o_frontend).

## 📌 Estrutura

O projeto é composto pelas seguintes tabelas:

- Usuários
- Pratos
- Ingredientes dos pratos
- Favoritos
- Carrinhos
- Itens dos carrinhos
- Pedidos
- Itens dos pedidos

## 💻 Tecnologias

Este projeto foi desenvolvido utilizando as seguintes tecnologias:

- Bcrypt.js
- CORS
- Dotenv
- Express.js
- express-async-errors
- JSON Web Token
- Knex.js
- Node.js
- Multer
- PM2
- SQLite
- SQLite3

## 💡 Utilização

O backend do projeto está hospedado em [[https://food-explorer-backend-oxwh.onrender.com]([https://foodexplorer-api-npff.onrender.com)]. A aplicação Foodexplorer está disponível para uso [aqui](link_para_a_aplicação).

⚠️ Importante: Este projeto utiliza uma hospedagem gratuita para o backend, podendo resultar em atrasos no tempo de resposta do servidor.

Você também pode executar o projeto em sua máquina localmente. Certifique-se de ter o Node.js e o npm instalados antes de prosseguir com as etapas abaixo:

1. Clone o projeto:
   ```bash
  git@github.com:CassioLinhares/foodexplorer_api.git
   ```
2. Acesse a pasta do projeto:
   ```bash
   $ cd food-explorer-backend
   ```
3. Instale as dependências:
   ```bash
   $ npm install
   ```
4. Execute as migrações:
   ```bash
   $ npm run migrate
   ```
5. Inicie o servidor:
   ```bash
   $ npm start
   ```

⚠️ Importante: Crie um arquivo `.env` de acordo com o arquivo `.env.example` e preencha os campos `AUTH_SECRET` e `PORT` com suas respectivas informações.

Para gerar o valor para o campo `AUTH_SECRET`, você pode utilizar o MD5 Hash Generator para gerar uma sequência de caracteres segura.

Preencha o campo `PORT` com o número da porta desejada para executar o servidor da aplicação.

## 📝 Licença

Este projeto está sob a licença MIT.

Feito com 💜 by Cássio Linhares 👋🏾
