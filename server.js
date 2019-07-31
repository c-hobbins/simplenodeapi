'use strict';

const express = require('express');
const bp = require('body-parser');

const PORT = 8099;
const HOST = '0.0.0.0';
const app = express();

//Setup a simple array of objects to seed some list of clients
let clientArray = [ 
      {id: 1, fname: 'Homer', lname: 'Simpson', gender: 'M', dob: '1960-03-23', age: 59},
      {id: 2, fname: 'Marge', lname: 'Simpson', gender: 'F', dob: '1961-12-30', age: 58},
      {id: 3, fname: 'Bart', lname: 'Simpson', gender: 'M', dob: '1984-10-11', age: 35},
      {id: 4, fname: 'Lisa', lname: 'Simpson', gender: 'F', dob: '1982-08-12', age: 37},
      {id: 5, fname: 'Maggie', lname: 'Simpson', gender: 'F', dob: '1992-10-04', age: 27},
      {id: 6, fname: 'Moe', lname: 'Szyslak', gender: 'M', dob: '1959-11-17', age: 60},
      {id: 7, fname: 'Barney', lname: 'Gumble', gender: 'M', dob: '1965-02-04', age: 54},
      {id: 8, fname: 'Milhouse', lname: 'Van Houten', gender: 'M', dob: '1984-09-21', age: 35},
      {id: 9, fname: 'Nelson', lname: 'Muntz', gender: 'M', dob: '1984-05-22', age: 35},
      {id: 10, fname: 'Krusty', lname: 'The Clown', gender: 'M', dob: '1954-06-06', age: 65},
      {id: 11, fname: 'Edna', lname: 'Krabappel', gender: 'F', dob: '1965-03-30', age: 54}
];

/*
Setup basic JSON middleware to parse the request body.
Will use it to modify the request body of a POST request before the handler processes it to create a new 'Id' value.
Obviously this won't support any sort of concurrency if you really need a unique value...just uses a simple concept to get an 'Id' value:)
*/
var jsonBodyParser = bp.json();
var urlParser = bp.urlencoded( { extended: true } );

/***************************************************************************
 Resource: clients
 Method: GET 
 Response: Returns the full array of client objects in a JSON response
****************************************************************************/
app.get('/clients', (req, res)=>{
   console.log("Returning list of %d clients...", clientArray.length);
   res.json(clientArray);
});

/***************************************************************************
 Resource: clients
 Method: GET/{clientId}
 Response: Returns the client found in the array in a JSON response
****************************************************************************/

app.get('/clients/:clientId', (req, res)=>{
   
   let clientId = parseInt(req.params.clientId);
   
   let foundClient = clientArray.find(client => client.id === clientId);
   
   if (typeof foundClient === 'undefined'){
      let errMsg = "Nobody was found for [id]=" + req.params.clientId; 
      console.log(errMsg);
      res.json({errmessage: errMsg});
   }
   else{
      console.log("Returning found client with [id]=" + req.params.clientId);
      res.json(foundClient);
  }
});

/***************************************************************************
 Resource: clients
 Method: POST/{clientId}
 Response: Returns the client found in the array in a JSON response
****************************************************************************/
app.post('/clients', jsonBodyParser, (req, res)=>{

   console.log("Got a request to POST:" + JSON.stringify(req.body));
 
   req.nextId = clientArray.length + 1;
   console.log("Middleware incremented index. nextId=" + req.nextId);
 
   clientArray.push( {id: req.nextId, fname: req.body.fname, lname: req.body.lname, gender: req.body.gender, dob: req.body.dob, age: req.body.age});
   let newClient = clientArray.find(client => client.id === req.nextId);
   res.json(newClient);
});

/***************************************************************************
 Resource: clients
 Method: DELETE/{clientId}
 Response: Deletes the client found in the array. This won't actualy delete it from the array for now ... just used for authentication validation
****************************************************************************/
app.delete('/clients/:clientId', (req, res) => {
   console.log("Received a DELETE request for client with [Id]=" + req.params.clientId + ", but this won't delete it. Just testing if you were allowed to get this far...");
   res.json({responseMsg: "You can delete things!"});
});

app.listen(PORT, HOST);
console.log(`Simple Node/Express API service running on => http://${HOST}:${PORT}`);