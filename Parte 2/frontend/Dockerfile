FROM node:16

WORKDIR /urs/src/api

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

CMD [ "sh", "-c", "npm run serve" ]