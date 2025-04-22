const CrudRepository = require("./crud-repository");
const { task } = require('../models');
module.exports = class TaskRepository extends CrudRepository {
  constructor() {
    super(task);
  }
  async getAllTask({ status, createdBy, limit, offset }) {
    const whereClause = {
      isDeleted: false,
      ...(status ? { status } : {}),
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
  
  async softDeleteTaskById({ id, createdBy }) {
    const tempTask = await task.findOne({
      where: {
        id,
        createdBy,
        isDeleted: false
      }
    });
  
    if (!tempTask) {
      return null; 
    }
  
    tempTask.isDeleted = true;
    await tempTask.save();
  
    return tempTask;
  }

  async updateTaskById({ id, createdBy, updateData }) {
    const [affectedCount] = await task.update(updateData, {
      where: { id, createdBy, isDeleted: false }
    });
    return affectedCount;
  }
}