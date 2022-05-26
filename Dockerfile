FROM node:16.14.2 

WORKDIR /usr/src/app

COPY ./.env .env

COPY ./package*.json ./

RUN npm install

CMD ["npm", "run", "start"]