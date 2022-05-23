const mockUserService = require('./MockUserService.js');
const userService = require('./UserService.js');
const express = require('express');
var server = express();

server.use(express.json());

server.post('/', function (req, res) {
    userService.isValid(req.query.token).then(function(result){
        if(result!=false){
            res.json({
                "uuid": result
            })
            res.status(200);
            res.end();
        }else{
            res.status(400);
            res.end();
        }
    })
})

server.post('/sign_in', function(req, res) {
    userService.isUser(req.query.username, req.query.password).then(function(result){
        if(result==false){
            res.status(404);
            res.end();
        }else{
            userService.addToken(req.query.username, result.token);
            res.json(result);
            res.status(200);
            res.end();
        }
      })
})

server.post('/sign_up', function(req, res) {
    userService.isUser(req.query.username, req.query.password).then(function(result){
        if(result==false){
            userService.addUser(req.query.username, req.query.password)
            res.status(200);
            res.end();
        }else{
            res.status(400);
            res.end();
        }
      })
})


// server.post('/', function (req, res) {
//     if(mockUserService.isValid(req.body.username, req.body.token)){    
//         res.status(200);
//         res.end();
//     }
//     else{
//         res.status(400);
//         res.end();
//     }
// })

// server.post('/sign_in', function(req, res) {

//     if(mockUserService.isUser(req.body.username, req.body.password)){
//         res.json(mockUserService.getToken(req.body.username));
//         res.status(200);
//         res.end();
//     }
//     else{
//         res.status(404);
//         res.end();
//     }
// })

// server.post('/sign_up', function(req, res) {
//     if(mockUserService.addUser(req.body.username, req.body.password)){
//         res.status(200);
//         res.end();
//     }
//     else{
//         res.status(400);
//         res.end();
//     }
// })

 var server = server.listen(8000, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("User server listening at http://%s:%s", host, port)
 })