const {User} = require('../models');
module.exports=class UserRepository{
    async create(data){
       const result= User.create(data);
       return result
    }
}