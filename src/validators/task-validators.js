const Joi = require('joi');
const taskInfo = Joi.object({
    title:Joi.string().alphanum().max(30).required(),
    description:Joi.string().max(250).required(),
    status: Joi.string().valid('Todo', 'In_progress', 'Done').required()
})
const getFilters = Joi.object({
    status: Joi.string().valid('Todo', 'In_progress', 'Done', 'All').required(),
    page:Joi.number().required(),
    limit:Joi.number().required()
})
module.exports= {
    taskInfo,
    getFilters
};