const User = require("./User")
const HashCode = require('./HashCode.js');
var mysql = require('mysql2');

var client = mysql.createConnection({
  host: "localhost",
  user: "mozixreality",
  password: "ylsh510574",
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

function isValid(token){
  return new Promise(function(resolve, reject){
    getUuid(token).then(function(uuid){
      if(uuid!=false){
        resolve(uuid);
      }else{
        resolve(false);
      }
    })
  });
}

function addToken(username, token){
  const sql = `
    UPDATE user 
    SET token='${token}'
    WHERE username='${username}';`;
  client.query(sql);
}

function getUuid(token){
  return new Promise(function(resolve, reject){
      const sql =  `SELECT uuid FROM user Where token='${token}';`;
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
  addToken:addToken, 
  isValid:isValid
}