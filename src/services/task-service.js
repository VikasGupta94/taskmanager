
module.exports = class TaskService {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    async createTask(data,user) {
        try {
            const temp_data = {
                title: data.title,
                description: data.description,
                status: data.status,
                createdBy:user.id
            }
            const result = await this.taskRepository.create(temp_data);
            return result;
        } catch (error) {
            throw error
        }
    }
    async getTask(data) {
        try {
            const userData = await this.taskRepository.getUserByEmail(data.email);
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
    async updateTask(data) {
        try {
            const userData = await this.taskRepository.getUserByEmail(data.email);
            if (!userData) {
                throw Error("invalid email");
            }
            return {email:userData.email,id:userData.id}
        } catch (error) {
            throw error
        }
    }
    async deleteTask(data) {
        try {
            const userData = await this.taskRepository.getUserByEmail(data.email);
            if (!userData) {
                throw Error("invalid email");
            }
            return {email:userData.email,id:userData.id}
        } catch (error) {
            throw error
        }
    }
}


