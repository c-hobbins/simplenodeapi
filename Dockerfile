FROM node:8-alpine

LABEL maintainer="hobbins.chad@gmail.com"
LABEL name="SimpleNodeAPI"
LABEL description "Just a simple Node application using express to host resource service. Nothing fancy...jyst for POC."
LABEL build_date="2019-07-29"
LABEL version="1.0"

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8899
CMD ["npm", "start"]