#FROM node:8-alpine 
FROM node:12.18.4-alpine

LABEL maintainer="hobbins.chad@gmail.com"
LABEL name="SimpleNodeAPI"
LABEL description "Just a simple Node application using express to host resource service. Nothing fancy and no backend persistence...just for API Store POC purposes."
LABEL build_date="2020-12-03"
LABEL version="1.1"

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD ["npm", "start"]