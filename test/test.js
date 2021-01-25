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
        }catch(err){
            throw(err);
        }
    });

    it("GET /v1/clients/{id} test", async function() {
        try{
            const res = await request.get('/v1/clients/6');
            expect(res.status).to.equal(200);
            expect(res.body.firstName).to.equal("Moe");
        }catch(err){
            throw(err);
        }
    });

    it("POST /v1/clients test", async function() {
        try{
            const res = await request.post('/v1/clients')
            .send({firstName: 'Ned', lastName: 'Flanders', gender: 'M', dateOfBirth: '1964-12-25', email: 'nedly@isotopemail.com'})
            .set('Accept', 'application/json');
            
            expect(res.status).to.equal(201);
            clientId = res.body.id;
        }catch(err){
            throw(err);
        }
    });

    it("DELETE /v1/clients/{id} test", async function() {
        try{
            const res = await request.delete('/v1/clients/' + clientId)
            
            expect(res.status).to.equal(204);
            clientId = res.body.id;
        }catch(err){
            throw(err);
        }
    });
});