FROM node:14.19.0-alpine3.15

WORKDIR /usr/src/app

COPY package.json /usr/src/app/
COPY dist/ /usr/src/app/dist/

RUN npm install --production
RUN apk add --no-cache postgresql-client

EXPOSE 4000

CMD [ "node", "dist/index.js" ]