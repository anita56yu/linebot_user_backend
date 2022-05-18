USE user_server;

CREATE TABLE user (
    username VARCHAR(20) NOT NULL PRIMARY KEY, 
    password VARCHAR(20),
    uuid VARCHAR(40));

INSERT INTO user (username, password, uuid)
VALUES ('admin', 'password', 'thisisuuid');
