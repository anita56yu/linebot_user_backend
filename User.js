const { v4: uuidv4 } = require('uuid');

class User {
    constructor(username, password){
        this.username=username
        this.password=password
    }

    generateUuid(){
        this.uuid=uuidv4();
    }
}

module.exports = User