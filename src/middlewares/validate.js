const validateBody = (schema) => (req, res, next) => {
    if (!req.body) {
        throw new Error("Request body is missing");
      }
    const { error } = schema.validate(req.body);
    if (error) {
        throw error
    }
    next()
};
const validateParams = (schema) => (req, res, next) => {
    if (!req.params) {
        throw new Error("Request  param is missing");
      }
    const { error } = schema.validate(req.params);
    if (error) {
        throw error
    }
    next()
};
module.exports={validateBody,validateParams};