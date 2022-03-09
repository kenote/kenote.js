FROM node:14.19.0-alpine3.15

WORKDIR /usr/src/app

COPY package.json /usr/src/app/
COPY dist/ /usr/src/app/dist/
COPY .nuxt /usr/src/app/.nuxt/
COPY nuxt.config.js /usr/src/app/

RUN npm install --production

EXPOSE 4000

CMD [ "node", "dist/index.js" ]