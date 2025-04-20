const { hash, verfiyHash } = require("../utils/hashing");
const { generateToken } = require('../utils/jwt');

module.exports = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async registerUser(data) {
        try {
            const hashed_passowrd = await hash(data.password);
            const temp_data = {
                username: data.username,
                email: data.email,
                password: hashed_passowrd
            }
            const result = await this.userRepository.create(temp_data);
            return result;
        } catch (error) {
            throw error
        }
    }
    async loginUser(data) {
        try {
            const userData = await this.userRepository.getUserByEmail(data.email);
            if (!userData) {
                throw Error("invalid email");
            }
            const verifyResult = await verfiyHash(userData.password, data.password);
            if (!verifyResult) {
                throw Error("invalid password");
            }
            const token = generateToken({ email: userData.email, id: userData.id });
            return token;
        } catch (error) {
            throw error
        }
    }
    async userDetails(data) {
        try {
            const userData = await this.userRepository.getUserByEmail(data.email);
            if (!userData) {
                throw Error("invalid email");
            }
            return {username:userData.username,email:userData.email,id:userData.id}
        } catch (error) {
            throw error
        }
    }
}


