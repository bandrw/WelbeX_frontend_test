FROM node:lts-alpine

WORKDIR /app

EXPOSE 3000

RUN yarn global add serve

CMD ["serve", "-s", "build", "-l", "3000"]

COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json ./
COPY webpack.config.js ./

RUN yarn install --pure-lockfile

COPY ./src ./src
COPY ./static ./static

RUN yarn build
