FROM node:16.17.1

WORKDIR /usr/src/app

COPY package.json /usr/src/app/

RUN npm install && npm install typescript -g

COPY . /usr/src/app/

RUN tsc

CMD npm start

EXPOSE 4000