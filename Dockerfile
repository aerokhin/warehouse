FROM node:18

WORKDIR /app

COPY package*.json ./
COPY config ./
COPY db ./

RUN npm install

COPY . .
RUN node_modules/.bin/sequelize db:drop || echo "Database doesn't exist"
RUN node_modules/.bin/sequelize db:create
RUN node_modules/.bin/sequelize db:migrate
RUN node_modules/.bin/sequelize db:seed:all

EXPOSE 8001

CMD [ "npm", "run", "start" ]
