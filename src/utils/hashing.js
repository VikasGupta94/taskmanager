const argon2= require('argon2');

module.exports={
    hash:(data)=>argon2.hash(data),
    verfiyHash:(hash,data)=>argon2.verfiyHash(hash,data)
}