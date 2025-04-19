

export default class UserController {
    async register(req, res) {
        try {
            console.log("you are in user register");
            res.json({
                value: "send succesfully"
            })
        } catch (error) {
            console.log(error);
        }

    }
}
