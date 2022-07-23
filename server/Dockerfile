FROM node:lts-alpine

WORKDIR /app

EXPOSE 3000

CMD ["yarn", "start"]

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --pure-lockfile

COPY ./src ./src
