FROM mhart/alpine-node:12

# Workdir
WORKDIR /app

EXPOSE 8000

ENV NODE_ENV production

COPY ./package.json .
COPY ./package-lock.json .

RUN npm install 

COPY ./dist ./dist
COPY ./server ./server

CMD [ "node", "server/index.js" ]
