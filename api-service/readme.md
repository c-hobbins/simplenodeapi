# SimpleNodeApi

This project was generated with Node [Express-4.17.1] (`https://expressjs.com/en/4x/api.html`)

## Run locally

Requires ***Node 12.18.4^*** and ***npm*** to be installed locally.

```bash session
$ git clone https://github.com/c-hobbins/simplenodeapi.git

$ npm start
```

Navigate to `http://localhost:8080/v1/clients/docs` :+1:

## Run as Docker container

```bash session
$ git clone https://github.com/c-hobbins/simplenodeapi.git

$ sudo docker build -t simple-node-api-img .

$ sudo docker run -it -p 8080:8080 --rm --name simple-node-api simple-node-api-img
*(-d to run detached)*
```

Navigate to `http://localhost:8080/v1/clients/docs` :+1:

## Running unit tests

Run `npm test` to execute unit tests using [Mocha] (`https://mochajs.org`)

## Further help

See the OAS 3.0 specification file.
