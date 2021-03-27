FROM node:12 AS builder
LABEL stage=builder

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm install --quiet

COPY ./*tsconfig.json ./
COPY ./src ./src

RUN npm run build
RUN npm run migrations:compile
RUN npm prune --production

FROM node:12-slim

WORKDIR /usr/src/app

COPY ./package*.json ./

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/build ./build
COPY ./scripts/start.sh ./start.sh
COPY ./sequelize.js ./sequelize.js
COPY ./.sequelizerc ./.sequelizerc

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.5.0/wait /usr/local/bin/wait-for
RUN chmod +x /usr/local/bin/wait-for

RUN chmod +x start.sh

CMD ["./start.sh"]
