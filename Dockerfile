FROM node:12.18.4-alpine

LABEL maintainer="hobbins.chad@gmail.com"
LABEL name="SimpleNodeAPI"
LABEL description "Just a simple Node application using express to host resource service. Nothing fancy and no backend persistence...just for API Store POC purposes."
LABEL build_date="2020-12-03"
LABEL version="1.1"

ENV DEBUG=true
ENV HTTP_PORT=8080
ENV HTTPS_PORT=8443
ENV REQUIRE_TLS=true
ENV REQUIRE_CLIENT_CERT=true
ENV CA_CERT=./certs/ca.crt
ENV SERVER_TLS_CERT=./certs/tls.crt
ENV SERVER_TLS_KEY=./certs/tls.key

WORKDIR /usr/src/app
COPY ./certs/tls.crt ./certs/
COPY ./certs/tls.key ./certs/
COPY ./certs/ca.crt ./certs/

COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080 8443
CMD ["npm", "start"]