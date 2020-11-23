const app = require("../server");

const expect = require("chai").expect;
const supertest = require("supertest");
const request = supertest(app);

const dummyData = require("../data/dummyClients");

let clientId;

describe("Test Script 1...", function() {
    it("This just tests the test harness :) Worked! ", function() {
        expect(true).to.equal(true);
    });
});

describe("Test Script 2...", function() {
    it("GET /v1/clients test", async function() {
        try{
            const res = await request.get('/v1/clients');
            expect(res.status).to.equal(200);
            expect(res.body.length).to.equal(dummyData.length);
            //console.log ("Returned " + res.body.length + " clients.");
        }catch(err){
            //console.log ("Caught handled error:" + err);
            throw(err);
        }
    });

    it("GET /v1/clients/{id} test", async function() {
        try{
            const res = await request.get('/v1/clients/6');
            expect(res.status).to.equal(200);
            expect(res.body.fname).to.equal("Moe");
            //console.log ("Returned '" + res.body.fname + "'!");
        }catch(err){
            //console.log ("Caught handled error:" + err);
            throw(err);
        }
    });

    it("POST /v1/clients test", async function() {
        try{
            const res = await request.post('/v1/clients')
            .send({fname: 'Ned', lname: 'Flanders', gender: 'M', dob: '1964-12-25', age: 56})
            .set('Accept', 'application/json');
            
            expect(res.status).to.equal(201);
            clientId = res.body.id;
            //expect(res.body.fname).to.equal("Moe");
            //console.log ("Returned new client {Id}='" + res.body.id + "'.");
        }catch(err){
            //console.log ("Caught handled error:" + err);
            throw(err);
        }
    });

    it("DELETE /v1/clients/{id} test", async function() {
        try{
            const res = await request.delete('/v1/clients/' + clientId)
            
            expect(res.status).to.equal(204);
            clientId = res.body.id;
            //expect(res.body.fname).to.equal("Moe");
            //console.log ("Returned new client {Id}='" + res.body.id + "'.");
        }catch(err){
            //console.log ("Caught handled error:" + err);
            throw(err);
        }
    });
});