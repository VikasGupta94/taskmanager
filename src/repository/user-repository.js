const { User } = require('../models');
const CrudRepository = require('./crud-repository');
module.exports = class UserRepository extends CrudRepository{
    constructor(){
        super(User);
    }
    async getUserByEmail(email) {
        const user = await User.findOne({
            where: { email },
            attributes: ['password', 'email', 'id','username']
        });
        return user || null;
    }
}