
module.exports = class TaskService {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    async createTask(data, user) {
        try {
            const temp_data = {
                title: data.title,
                description: data.description,
                status: data.status,
                createdBy: user.id
            }
            const result = await this.taskRepository.create(temp_data);
            return result;
        } catch (error) {
            throw error
        }
    }
    async getTask(data, user) {
        try {
            let offset = (data.page - 1) * data.limit;
            const tempData = {
                createdBy: user.id,
                status: data.status == 'All' ? null : data.status,
                limit: data.limit,
                offset: offset
            }
            const userData = await this.taskRepository.getAllTask(tempData);
            return userData
        } catch (error) {
            throw error
        }
    }
    async updateTask(id, data, user) {
        try {
            const userData = await this.taskRepository.updateTaskById({ id, createdBy: user.id, updateData: data });
            if (!userData) {
                throw Error("NO record to update");
            }
            return userData
        } catch (error) {
            throw error
        }
    }
    async deleteTask(id,user) {
        try {
            const deleteResult = await this.taskRepository.softDeleteTaskById({id, createdBy: user.id});
            if (!deleteResult) {
                throw Error("Not found or already deleted or not created by this user");
            }
            return deleteResult;
        } catch (error) {
            throw error
        }
    }
}


