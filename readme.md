# database config

<p>Install mysql (see https://dev.mysql.com/downloads/installer/)</p>
<p>Change mysql user to root and password to password, or rewrite settings in UserService.js as wishes</p>

```mysql -p```
 to start mysql console

```CREATE DATABASE user_server;```
 to create user server database

```mysql -p user_server < ./db/DB.sql```
 to create schema and load default values for user table

# get started

```npm install```
 to install node modules

```npm start```
 to run server on localhost:8081

# API

## post /

<p>post token and username to know if the said token is valid (timeout = 7200s)</p>
<p>valid: 200</p>
<p>invalid: 400</p>

### example post body

```{"username": "admin", "token": "U2FsdGVkX19dC/liDZG3E9oA8iDCW2YzEAjtLZ2EZaknkmmRIcezCfc0t8k6PwhNf48I89NY8je12MhDv/sAiDfE9nNEj+4n1Gh/V1MX4+k="}```
  this token is only for example, this will not work

## post /sign_in

<p>post username and password to sign in (timeout = 7200s)</p>
<p>success: 200</p>
<p>unsuccess: 404</p>
<p>the body will contain token and expire time</p>

### example post body

```{"username": "admin", "password": "password"}```
  this is the default login user

## post /sign_up

<p>post username and password to sign up</p>
<p>success: 200</p>
<p>unsuccess: 400 (duplicate username)</p>

### example post body

```{"username": "user", "password": "password"}```