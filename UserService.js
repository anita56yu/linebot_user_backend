const User = require("./User")
const HashCode = require('./HashCode.js');
var mysql = require('mysql');

var client = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "user_server"
});

client.connect(function(err) {
  if (err) {throw err};
});

function isUser(username, password){
  return new Promise(function(resolve, reject){
    const sql =  `SELECT * FROM user Where username='${username}' AND password='${password}';`;
    client.query(sql, function(err, rows) {
      if(rows === undefined){
        reject(new Error("Error rows is undefined"));
      }else{
        if(rows[0]!=null){
          resolve(HashCode.hash(rows[0].uuid));
        }else{
          resolve(false);
        }
      }
    });
  });
}

function addUser(username, password){
  let user = new User(username, password)
  user.generateUuid()
  const sql =  `INSERT INTO user (username, password, uuid)
  VALUES ('${user.username}', '${user.password}', '${user.uuid}');`;
  client.query(sql);
}

function isValid(username, token){
  return new Promise(function(resolve, reject){
    getUuid(username).then(function(uuid){
      if(uuid!=false && HashCode.dehash(token, uuid)){
        resolve(true);
      }else{
        resolve(false);
      }
    })
  });
}

function getUuid(username){
  return new Promise(function(resolve, reject){
      const sql =  `SELECT * FROM user Where username='${username}';`;
      client.query(sql, function(err, rows) {
      if(rows === undefined){
        reject(new Error("Error rows is undefined"));
      }else{
        if(rows[0]!=null){
          resolve(rows[0].uuid);
        }else{
          resolve(false);
        }
      }
    });
  });
}

module.exports = {
  isUser:isUser,
  addUser:addUser, 
  isValid:isValid
}