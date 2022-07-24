FROM node:lts-alpine

WORKDIR /app

EXPOSE 3000

CMD ["yarn", "build:start"]

COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json ./
COPY webpack.config.js ./

RUN yarn install --pure-lockfile

COPY ./src ./src
COPY ./server ./server
COPY ./static ./static

RUN yarn build
