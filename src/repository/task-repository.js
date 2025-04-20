const CrudRepository = require("./crud-repository");
const {task}=require('../models');
module.exports = class TaskRepository extends CrudRepository{
    constructor(){
        super(task);
    }
}