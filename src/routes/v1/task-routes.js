const express = require('express');
const { authenticate, validateBody } = require('../../middlewares');
const { taskValidator } = require('../../validators');
const { TaskController } = require('../../controllers');
const { TaskService } = require('../../services');
const { TaskRepository } = require('../../repository');
const routes=express.Router();
const taskRepository=new TaskRepository();
const taskService= new TaskService(taskRepository);
const taskController=new TaskController(taskService);
routes.post('/',authenticate,validateBody(taskValidator.taskInfo),taskController.createTask.bind(taskController))
module.exports=routes;