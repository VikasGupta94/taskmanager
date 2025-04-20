const CrudRepository = require("./crud-repository");
const {task}=require('../models');
module.exports = class TaskRepository extends CrudRepository{
    constructor(){
        super(task);
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

      async  updateTaskById(id, updateData) {
        const [updatedCount] = await task.update(updateData, {
          where: {
            id,
            isDeleted: false 
          }
        });
        return updatedCount > 0; 
      }
}