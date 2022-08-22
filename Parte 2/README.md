# LudusCristaltecChallenge

## Como correr o programa

Antes de conectar o backend mude a informação relativa a base de dados que se encontra no ficheiro .env na pasta backend
A base de dados utilizada é em MariaDB (o sequelize é usado para criar as tabelas necessárias)

### Docker Compose 

O docker compose corre o backend e o frontend e usa a base de dados disponivel no ambiente do utilizador
Antes de correr o docker compose os dados sobre o ambiente e as migrações tem de ser feitas
Para correr o docker compose use o seguinte comando:

docker compose up

### Migrações

Para usar as migrações e necessário o sequelize-cli, para instalar o sequelize-cli use o seguinte comando:

npm install sequelize-cli

Se já tiver o sequelize-cli, apenas tem de mudar os dados sobre a base de dados (que se encontra na pasta config no backend) e corra o seguinte comando:

npx sequelize-cli db:migrate

Para desfazer a migração pode usar o seguinte comando:

npx sequelize-cli db:migrate:undo

### Para ligar o backend

na pasta backend correr realizar os seguintes passos

npm install

npm start

### Para ligar o frontend

na pasta frontend correr realizar os seguintes passos

npm install

npm run serve

## Informação adicional 

Para o frontend foi usado Vuetify 3 (Vue UI Library)

