const CryptoJS = require("crypto-js");
const expire = 7200
function hash(uuid){
    token = CryptoJS.AES.encrypt(Date().toString(), uuid).toString();
    return {token, expire}
}

function dehash(token, uuid){
    var then = Date.parse(CryptoJS.AES.decrypt(token, uuid).toString(CryptoJS.enc.Utf8))
    var now = Date.now()
    if ((now-then)/1000<=expire){
        return true
    }
    return false
}

module.exports = {
    hash:hash, 
    dehash:dehash
}