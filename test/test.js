/**
 * Created by Kari on 15.9.2015.
 */

var assert = require("assert");
var expect  = require("chai").expect;
var request = require("request");
var routes = require("../app/routes.js");

describe('Array', function() {
    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            assert.equal(-1, [1,2,3].indexOf(5));
            assert.equal(-1, [1,2,3].indexOf(0));
        });
    });
});

describe('Kontaktor contacts', function() {
    describe('http interface tests', function () {
        var url = "http://localhost:8080/index.html";

        it("GET returns status 200", function(done) {
            request(url, function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
        // stupid test and api should be changed
        it("GET returns status 200 for *", function(done) {
            url = "http://localhost:8080/notnot_index.html";
            request(url, function(error, response, body) {
                expect(response.statusCode).to.not.equal(404);
                done();
            });
        });
        it("DELETE returns status 200", function(done) {
            url = "http://localhost:8080/api/todos/2";
            request(url, function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
    });
});
