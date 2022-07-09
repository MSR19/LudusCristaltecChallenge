# LudusCristaltecChallenge

## Como correr o programa

na pasta backend correr realizar os seguintes passos

npm install

npm start

O server corre na porta 5000, esta porta pode ser mudado no ficheiro .env na variável REACT_APP_PORT

## Rotas

O backend tem 3 rotas:

http://localhost:PORT/api/v1/tags

http://localhost:PORT/api/v1/cats/filter?tag={{filtertag}}&omit={{number}}&total={{number}}

http://localhost:PORT/api/v1/cats/match?string={{substr}}

Esta ultima rota retorna um json com a seguinte configuração:

{
    Tag: tag que contem a substr,

    Content: Conteúdo da Tag    
}

## Postman

O ficheiro cats.postman_collection.json, contem as request ao servidor, caso altere a porta do servidor mude também a porta da coleção do postman
