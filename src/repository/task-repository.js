const CrudRepository = require("./crud-repository");
const {task}=require('../models');
module.exports = class TaskRepository extends CrudRepository{
    constructor(){
        super(task);
    }
    async getAllTask({ status,createdBy, limit, offset }) {
      const whereClause = {
        isDeleted: false,
        ...(status ? { status } : {}) ,
        ...(createdBy ? { createdBy } : {})
      };
    
      const tasks = await task.findAndCountAll({
        where: whereClause,
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [['createdAt', 'DESC']]
      });
    
      return tasks; 
    }
     async  softDeleteTaskById(id) {
        const tempTask = await task.findByPk(id);
        if (!tempTask || tempTask.isDeleted) {
          return null; 
        }
        tempTask.isDeleted = true;
        await tempTask.save();
        return tempTask;
      }

      async updateTaskById({ id, createdBy, updateData }) {
        const temp_task = await task.findOne({
          where: { id, createdBy ,isDeleted:false}
        });
        if (!temp_task) {
          return null; // No task found
        }
        const updatedTask = await temp_task.update(updateData);
        return updatedTask; // Returns the updated task
      }
}