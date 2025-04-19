export const validateBody = (schema) => (req, res, next) => {
    if (!req.body) {
        throw new Error("Request body is missing");
      }
    const { error } = schema.validate(req.body);
    if (error) {
        throw error
    }
    next()
};