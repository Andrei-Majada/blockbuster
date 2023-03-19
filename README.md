# Blockbuster

Client web de apresentação e registro de filmes e séries com o catalogo listado pelo TMDB API.

O frontend foi desenvolvido utilizando React e sua estilização foi feita com a biblioteca de componentes Chakra UI, com icones do React-Icons e utilizando Axios para conexçao com backend.
Na aplicação possuímos a apresentação da lista de filmes, inserção de um novo filme, edição de um filme e exclusão, todos com atributos de titulo, resumo, imagem, avaliação e data de lançamento.
Temos duas abas principais que são a lista completa de filmes que traz todas as informações dos filmes buscados por popularidade e os favoritos que permite listar 

O backend foi desenvolvido em NestJs com Typescript, que é um framework NodeJs muito utilizado para aplicações robustas e escaláveis, que usa Express por padrão e nele também utilizamos o mongoose para a persistência de dados.

A documentação da API foi gerada utilizando o Swagger que é uma das mais famosas API's de documentação.

### Stack utilizada frontend:
- HTML5
- CSS3
- React.
- Chakra UI.

### Stack utilizada backend:
- NestJs.
- Mongoose.

## Instalação

Clone este repositório:

```bash
git clone https://github.com/Andrei-Majada/blockbuster.git
```
### Execução frontend

No diretório de origem abra o terminal e execute na ordem a lista de comandos:
```bash
cd frontend
```
```bash
npm i
```
```bash
npm start
```
Caso o cliente não abra sozinho em seu navegador padrão, vá ate seu navegador:
```bash
localhost:3000
```

### Execução backend

No diretório de origem abra o terminal e execute na ordem a lista de comandos. 
```bash
cd backend
```
O banco de dados MongoDB foi containerizado para a aplicação, caso não tenha o Docker instalado é possível seguir o tutorial de instalação no [link](https://www.docker.com/).
```bash
docker-compose up -d
```
Para armazenar as URL's e informações sensíveis, estou utilizando o pacote dotenv e armazenando as variáveis no arquivo .env, como o arquivo esta listado no .gitignore é necessário alterar o nome do arquivo .env.example para .env.
Para utilização das chamadas a API do TMDB é preciso alterar a **API KEY** dentro da URL, a **API KEY** foi passada por email.
```bash
npm i
```
Para popular o banco de dados que está rodando na porta 27017, utilizei a biblioteca migrate-mongo. Criei o script migrate:up que realiza uma requisição GET na API TMDB e popula com os 20 filmes mais populares. Foi criado também o migrate:down que apaga todos os elementos do banco de dados.
```bash
npm run migrate:down
```
```bash
npm run migrate:up
```
```bash
npm run start:dev
```
Caso todos os comando obtenham êxito a API deve estar rodando e disponível na porta 3001.
Como documentação da aplicação utilizei a biblioteca Swagger, com ela é possível simular requisições a todas as rotas contendo os parâmetros e *bodys* necessários.
Para acessar o Swagger acesse a rota:
```bash
localhost:3001/docs
```
