const { User } = require('../models');
const CrudRepository = require('./crud-repository');
module.exports = class UserRepository extends CrudRepository{
    constructor(){
        super(User);
    }
    // async create(data) {
    //     const result = User.create(data);
    //     return result
    // }
    async getUserByEmail(email) {
        const user = await User.findOne({
            where: { email },
            attributes: ['password', 'email', 'id','username']
        });
        return user || null;
    }
}