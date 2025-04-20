module.exports = class CrudRepository {
    constructor(model) {
        this.model = model
    }
    async create(data) {
        const result = this.model.create(data);
        return result
    }
}