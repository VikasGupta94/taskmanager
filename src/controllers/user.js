

module.exports = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async register(req, res) {
        try {
             await this.userService.registerUser(req.body);
            res.status(200).json({is_error:0,message:"You have registered successfully!"})
        } catch (error) {
            throw error
        }
    }
    async login(req, res) {
        try {
            const result = await this.userService.loginUser(req.body);
            res.status(200).json(result)
        } catch (error) {
            throw error
        }
    }
    async user(req, res) {
        try {
            const result = await this.userService.userDetails(req.user);
            res.status(200).json(result)
        } catch (error) {
            throw error
        }

    }
}
