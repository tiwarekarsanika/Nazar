import UserService from "../service/userService";

class UserController{
    static async fetchAllUsers(req, res){
        try {
            const response = await UserService.fetchAllUsers(req.body)
            res.status(200).json(response);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async fetchUserByEmail(req, res){
        try {
            const response = await UserService.fetchUserByEmail(req.body)
            res.status(200).json(response);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async fetchUserById(req, res){
        try {
            const response = await UserService.fetchUserById(req.body)
            res.status(200).json(response);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

export default UserController;