FROM node:8.3.0-alpine
MAINTAINER Mikhail Kuleshov
EXPOSE 9050
WORKDIR /home/tv

COPY ./api/package.json /home/tv/
COPY ./api/package-lock.json /home/tv/
RUN npm install

COPY ./api/index.js /home/tv/
COPY ./api/public /home/tv/public

ENV NODE_ENV=production

CMD node 'index.js'
