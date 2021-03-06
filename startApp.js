const fs = require('fs');
const https = require('https');
const http = require('http');

const app = require("./server");
const chalk = require('chalk');

//Set the host:port for the runtime separate from server.js so as not to conflict with the execution of test.js
const DEBUG = process.env.DEBUG || false;
const HTTP_PORT = process.env.HTTP_PORT || 8080; //8080
const HTTPS_PORT = process.env.HTTPS_PORT || 8443; //8443
const SERVER_TLS_CERT = process.env.SERVER_TLS_CERT;
const SERVER_TLS_KEY = process.env.SERVER_TLS_KEY;
const CA_CERT = process.env.CA_CERT;
const REQUIRE_CLIENT_CERT = process.env.REQUIRE_CLIENT_CERT || false;
const REQUIRE_TLS = process.env.REQUIRE_TLS || false;

const HOST = '0.0.0.0';

//Just some stuff to get environment variables and debug, nothing interesting here...
let debugOnOff = DEBUG?chalk.green("ON"):chalk.yellow("OFF");
console.log(chalk.white("Debug is ") + debugOnOff);

if(DEBUG)
{
  console.log(chalk.yellow("********************************"));
  console.log(chalk.yellow("Process Environment Variables..."));
  console.log(chalk.yellow("********************************"));
  console.log(chalk.yellow("   HTTP_PORT           : ") + HTTP_PORT);
  console.log(chalk.yellow("   HTTPS_PORT          : ") + HTTPS_PORT);
  
  let tls_cert = SERVER_TLS_CERT?chalk.green('OK'):chalk.red(undefined); //Don't want to share the contents of the secrets:)
  console.log(chalk.yellow("   SERVER_TLS_CERT     : ") + tls_cert);
  
  let tls_key = SERVER_TLS_KEY?chalk.green('OK'):chalk.red(undefined);
  console.log(chalk.yellow("   SERVER_TLS_KEY      : ") + tls_key);
  
  let tls_ca = CA_CERT?chalk.green('OK'):chalk.red(undefined);
  console.log(chalk.yellow("   CA_CERT             : ") + tls_ca);

  console.log(chalk.yellow("   REQUIRE_TLS         : ") + REQUIRE_TLS);
  console.log(chalk.yellow("   REQUIRE_CLIENT_CERT : ") + REQUIRE_CLIENT_CERT);
  console.log(chalk.yellow("********************************"));
}

var options = {};

//If there are no references to TLS CERT/KEY then stop
if(REQUIRE_TLS === 'true'){
  if(!SERVER_TLS_CERT || !SERVER_TLS_KEY){
    console.log(chalk.red("The environment variable SERVER_TLS_CERT and|or SERVER_TLS_KEY was not provided. This is required for TLS. Reference the 'readme.md'."));
    console.log("Killing process: %s", process.pid);
    process.kill(process.pid, 'SIGTERM');
  }else{
    options.cert = fs.readFileSync(SERVER_TLS_CERT);
    options.key = fs.readFileSync(SERVER_TLS_KEY);
  }

  //Note that the ca.crt is only needed if client certificate is requested && the provided client cert is self signed.
  if(REQUIRE_CLIENT_CERT === 'true'){
    options.ca = fs.readFileSync(CA_CERT);
    options.requestCert = true;
    options.rejectUnauthorized = true;
  }
}

//Don't want to start both...leave as mutually exclusive for simplicity
let isHttps = false;

if(REQUIRE_TLS === 'true'){
  isHttps = true;
  https.createServer(options, app).listen(HTTPS_PORT);
}else{
  http.createServer(app).listen(HTTP_PORT);
}

let tlsOnOff = isHttps?chalk.green('ON'):chalk.yellow('OFF');
console.log(chalk.white("\nTLS is : ") + tlsOnOff);

let serviceURI = isHttps?`https://${HOST}:${HTTPS_PORT}`:`http://${HOST}:${HTTP_PORT}`;

console.log("\nService running on => %s\n", chalk.yellow(serviceURI));

