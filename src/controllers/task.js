const { StatusCodes } = require("http-status-codes");
const { successResponse } = require("../utils/response");

module.exports = class TaskController {
    constructor(taskService) {
        this.taskService = taskService;
    }

    async createTask(req, res) {
        try {
            const result = await this.taskService.createTask(req.body,req.user);
            successResponse(res,'task created',{},StatusCodes.CREATED);
        } catch (error) {
            throw error
        }
    }
    async getTask(req, res) {
        try {
            const result = await this.taskService.getTask(req.body,req.user);
            res.status(200).json(result)
        } catch (error) {
            throw error
        }
    }
    async updateTask(req, res) {
        try {
            const { id } = req.params;
            const result = await this.taskService.updateTask(id, req.body,req.user);
            res.status(200).json(result);
        } catch (error) {
            throw error
        }
    }
    async deleteTask(req, res) {
        try {
            const { id } = req.params;
            const result = await this.taskService.deleteTask(id,req.user);
            res.status(200).json(result);
        } catch (error) {
            throw error
        }
    }
} 