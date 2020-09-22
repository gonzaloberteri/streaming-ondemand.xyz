const request = require("supertest");
const superagent = require("superagent");
const chai = require("chai");
const expect = chai.expect;
const app = require("../app");
const mockLogin = require("./mock-login");

describe("category route", () => {
    describe("post /add-category", () => {
        const agent = superagent.agent(app);

        beforeEach((done) => {
            mockLogin();
            request(app)
                .get("/auth/login")
                .end((err, result) => {
                    if (!err) {
                        done();
                    } else {
                        done(err);
                    }
                });
        });

        it("should add a new category", (done) => {
            request(app)
                .post("/add-category")
                .set({ "Content-Type": "application/json" })
                .send({
                    category_text: "📺 TV Shows",
                })
                .end((err, res) => {
                    console.log("AAAAAAAA");
                    if (!err) {
                        expect(res.status).to.eq(200);
                        done();
                    }else{
                        done(err)   
                    }
                });
        });
    });
});
