/**
 * Created by Pratibha Patil on 09/03/2018.
 *
 */

/* Import the required npm modules */
const express = require('express');
/* Create a express app */
var app = express();


const throttle = require("express-throttle");
const jwt = require('jsonwebtoken-refresh');


/* Make the server listen to port 8080 */
var server = app.listen(8080, function () {
    console.log("Code exercises app listening at http:localhost:8080");
})


app.get("/", function(request,response){
    response.send('Success');
});

/* Define a end point /_api_v1/token which creates a JWT token and stores it in the app memory */
app.get("/_api_v1/token", throttle({ "burst": 10, "rate": "5/s" }) ,function(request, response){
    /* Define a payload and a secret key for JWT Token */
    var payload  = { name : 'Pratibha' };

    /* Create a JWT Token in asynchronous way */
    jwt.sign(payload, 'mysecret', { expiresIn: 60*60 }, function(token){

        // Store the token in the memory
        app.set('myToken', token);

        // Send 'Success' response
        response.status(200, {'Content-Type': 'text/plain'});
        response.send(token);

    });

});


/* Define a end point /_api_v1/refresh_token  which refreshes the token stored in the app memory  */
app.post("/_api_v1/refresh_token", throttle({ "burst": 10, "rate": "5/s" }), function(request, response){
    // get the previously stored token
    var token = app.get('myToken');

    /* Check if the Token was expired more than 1 hour */
    jwt.verify(token, 'mysecret', function(err,verifiedToken){
        if (err) {
            if (err.name == 'TokenExpiredError') {
                /* Calculate the time differrence between current time and the time when the token was expired */
                var dateNow = new Date();
                var timeElapsed = dateNow.getHours() - err.expiredAt;
                if (timeElapsed > 1) {
                    response.status(403, {'Content-Type': 'text/plain'});
                    response.json({
                        message: 'Failure:' + err.message
                    });
                }
            }
        } else {
            var decodedToken = jwt.decode(token, 'mysecret');
            jwt.refresh(decodedToken, 60 * 60, 'mysecret', function (err, refreshedToken) {
                response.status(200, {'Content-Type': 'text/plain'});
                response.json({
                    message: 'Success'
                });
            });
        }

    });

});
/* Define a end point : _api_v1/hello which simply sends a response 'Hello World' */
app.get("/_api_v1/hello", function(request, response){
    response.status(200, {'Content-Type': 'text/plain'});
    response.send("Hello World");
});
