const { hash } = require("../utils/hashing");


module.exports = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async registerUser(data) {
        try {
            const hashed_passowrd = await hash(data.password);
            const temp_data = {
                username: data.name,
                email: data.email,
                password: hashed_passowrd
            }
            const result = await this.userRepository.create(temp_data);
            return result;
        } catch (error) {
            throw error
        }
    }
}


