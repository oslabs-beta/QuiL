FROM node:16.17.1

WORKDIR /usr/src/app

COPY package.json /usr/src/app/

RUN npm install && npm install typescript -g

COPY . /usr/src/app/

RUN tsc

RUN npm run build

CMD npm start

EXPOSE 3000