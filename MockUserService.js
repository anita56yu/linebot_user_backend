const User = require("./User")
const CryptoJS = require("crypto-js");
const HashCode = require('./HashCode.js');
const user1 = new User("username", "password")
user1.generateUuid()
const user2 = new User("admin", "adminpassword")
user2.generateUuid()
let users = [user1, user2]


function isUser(username, password){
    for(const user of users){
        if(user.username==username && user.password==password){
            return true
        }
    }
    return false
}

function addUser(username, password){
    for(const user of users){
        if(user.username==username){
            return false
        }
    }
    let user = new User(username, password)
    user.generateUuid()
    users.push(user)
    return true
}

function getToken(username){
    for(const user of users){
        if(user.username==username){
            res = HashCode.hash(user.uuid)
            return res
        }
    }
    return null
}

function isValid(username, token){
    for(const user of users){
        if(user.username==username){
            if(HashCode.dehash(token, user.uuid)){
                return true
            }
            else{
                return false
            }
        }
    }
    return false
}

module.exports = {
    isUser:isUser,
    addUser:addUser,
    getToken:getToken, 
    isValid:isValid
}