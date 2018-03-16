var expect  = require('chai').expect;
var request = require('request');

it('End point _api_v1/hello :', function(done) {
    request('http://localhost:8080/_api_v1/hello' , function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
    });
});

it('End point /_api_v1/token :', function(done) {
    request('http://localhost:8080/_api_v1/token' , function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
    });
});


it('End point /_api_v1/refresh_token :', function(done) {
    request.post('http://localhost:8080/_api_v1/refresh_token' , function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
    })
});


