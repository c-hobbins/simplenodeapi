const express = require("express");
const clientRouter = express.Router();
const bp = require('body-parser');

//Setup a simple array of objects to sed some list of clients. 
//To-Do: Move this to an in memory db or a no-sql database
let clientArray = require("../data/dummyClients");

/*
Setup basic JSON middleware to parse the request body.
Will use it to modify the request body of a POST request before the handler processes it to create a new 'Id' value.
Obviously this won't support any sort of concurrency if you really need a unique value...just uses a simple concept to get an 'Id' value:)
*/
var jsonBodyParser = bp.json();
var urlParser = bp.urlencoded( { extended: true } );


clientRouter.use(function logTimestamp( req, res, next) {
    console.log("System::Time::" + Date.now.toString);
    next();
});

/***************************************************************************
 Resource: clients
 Method: GET 
 Response: Returns the full array of client objects in a JSON response
****************************************************************************/
clientRouter.get('/clients', (req, res)=>{
    console.log("Service::Returning list of %d clients...", clientArray.length);
    res.status(200).json(clientArray);
 });
 
 /***************************************************************************
  Resource: clients
  Method: GET/{clientId}
  Response: Returns the client found in the array in a JSON response
 ****************************************************************************/
 
clientRouter.get('/clients/:clientId', (req, res)=>{
    
    let clientId = parseInt(req.params.clientId);
    
    let foundClient = clientArray.find(client => client.id === clientId);
    
    if (typeof foundClient === 'undefined'){
       let errMsg = "Service::Nobody was found for [id]=" + req.params.clientId; 
       console.log(errMsg);
       res.json({errmessage: errMsg});
    }
    else{
       console.log("Service::Returning found client with [id]=" + req.params.clientId);
       res.status(200).json(foundClient);
   }
 });
 
 /***************************************************************************
  Resource: clients
  Method: POST/{clientId}
  Response: Returns the client found in the array in a JSON response
 ****************************************************************************/
clientRouter.post('/clients', jsonBodyParser, (req, res)=>{
 
    console.log("Service::Got a request to POST:" + JSON.stringify(req.body));
  
    req.nextId = clientArray.length + 1;
    console.log("Service::Middleware incremented index. nextId=" + req.nextId);
  
    clientArray.push( {id: req.nextId, fname: req.body.fname, lname: req.body.lname, gender: req.body.gender, dob: req.body.dob, age: req.body.age});
    let newClient = clientArray.find(client => client.id === req.nextId);
    res.status(201).json(newClient);
 });
 
 /***************************************************************************
  Resource: clients
  Method: DELETE/{clientId}
  Response: Deletes the client found in the array. This won't actualy delete it from the array for now ... just used for authentication validation
 ****************************************************************************/
clientRouter.delete('/clients/:clientId', (req, res) => {
    console.log("Service::Received a DELETE request for client with [Id]=" + req.params.clientId + ", but this won't delete it. Just testing if you were allowed to get this far...");
    res.status(204).json({responseMsg: "You can delete things!"});
 });

module.exports = clientRouter;