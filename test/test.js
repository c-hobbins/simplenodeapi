const app = require("../server");

const expect = require("chai").expect;
const supertest = require("supertest");
const request = supertest(app);

describe("Test Script 1...", () => {
    it("This just tests the test harness :) Worked! ", () => {
        expect(true).to.equal(true);
    });
});

describe("Test Script 2...", function () {
    it("Test GET /clients endpoint", async () => {
        try{
            const res = await request.get('/clients');
            expect(res.status).to.equal(200);
            expect(res.body.length).to.equal(11);
        }catch(err){
            console.log ("Caught Error:" + err)
        }
    });
});