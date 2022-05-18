// var CryptoJS = require("crypto-js");
const { v4: uuidv4 } = require('uuid');
uuid = uuidv4()
console.log(uuid.length)
// // Encrypt
// key = uuidv4()
// var ciphertext = CryptoJS.AES.encrypt(Date().toString(), key).toString();

// // Decrypt
// var bytes  = CryptoJS.AES.decrypt(ciphertext, key);
// var originalText = bytes.toString(CryptoJS.enc.Utf8);

// console.log(originalText); // 'my message'




// const HashCode = require("./HashCode.js")
// const User = require("./User");
// let user = new User("user", "pass")
// user.generateUuid()
// console.log(HashCode.hash(user.uuid))



// console.log(HashCode.dehash(HashCode.hash(user.uuid).token, user.uuid))
// var bytes  = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
// var originalText = bytes.toString(CryptoJS.enc.Utf8);

// console.log(originalText); // 'my message'