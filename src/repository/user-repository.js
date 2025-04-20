const { User } = require('../models');
module.exports = class UserRepository {
    async create(data) {
        const result = User.create(data);
        return result
    }
    async getUserByEmail(email) {
        const user = await User.findOne({
            where: { email },
            attributes: ['password', 'email', 'id']
        });
        return user || null;
    }
}