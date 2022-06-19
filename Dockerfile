FROM node:16.14.2 

RUN mkdir /home/node/app

WORKDIR /home/node/app

COPY ./.env .env

COPY ./package*.json ./

RUN npm install --cache "/home/node/.npm"

CMD ["npm", "run", "dev"]