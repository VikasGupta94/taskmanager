
const { StatusCodes } = require("http-status-codes");
const { successResponse } = require("../utils/response");
module.exports = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async register(req, res) {
             await this.userService.registerUser(req.body);
            successResponse(res,'You have registered successfully!','',StatusCodes.CREATED);
    }
    async login(req, res) {
            const result = await this.userService.loginUser(req.body);
            successResponse(res,'You have logged successfully!',result,StatusCodes.OK);
    }
    async user(req, res) {
        try {
            const result = await this.userService.userDetails(req.user);
            successResponse(res,'You have logged successfully!',result,StatusCodes.OK);
        } catch (error) {
            throw error
        }

    }
}
