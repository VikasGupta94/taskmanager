const { StatusCodes } = require("http-status-codes");
const { successResponse } = require("../utils/response");

module.exports = class TaskController {
    constructor(taskService) {
        this.taskService = taskService;
    }

    async createTask(req, res) {
        await this.taskService.createTask(req.body, req.user);
        successResponse(res, 'task created.', {}, StatusCodes.CREATED);
    }
    async getTask(req, res) {
        const result = await this.taskService.getTask(req.body, req.user);
        successResponse(res, '', result, StatusCodes.OK);
    }
    async updateTask(req, res) {
        const { id } = req.params;
        await this.taskService.updateTask(id, req.body, req.user);
        successResponse(res, 'Task updated.', '', StatusCodes.OK);
    }
    async deleteTask(req, res) {
        const { id } = req.params;
        await this.taskService.deleteTask(id, req.user);
        successResponse(res, 'Task deleted successfully.', '', StatusCodes.OK);
    }
} 