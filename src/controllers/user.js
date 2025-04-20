

module.exports = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async register(req, res) {
        try {
            console.log()
            const result = await this.userService.registerUser(req.body);
            console.log(result, "controller 10 line");
            res.status(200).json(result)
        } catch (error) {
            console.log(error, "line 13");
            throw error
        }

    }
}
