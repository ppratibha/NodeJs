/**
 * Created by ppatil on 09/03/2018.
 */
//const jwt = require('jwt-simple');
const jwt    = require('jsonwebtoken');
var payload = { name : 'Pratibha' };
var secret = 'mysecret';


//var token = jwt.encode(payload, secret);

var token = jwt.sign(payload, 'mysecret', {
    expiresInMinutes: 1440 // expires in 24 hours
});

var token = jwt.sign(payload, app.get('superSecret'), {
    expiresInMinutes: 1440 // expires in 24 hours
});


var decoded = jwt.decode(token, secret);
console.log(decoded); //=> {z foo: 'bar' }