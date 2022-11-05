FROM node:16

EXPOSE 6000

WORKDIR /storage

COPY package.json ./

RUN npm install

CMD [ "node", "index.js" ]