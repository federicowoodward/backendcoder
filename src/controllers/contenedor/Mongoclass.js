import mongoose from "mongoose";

export class MongoClass {
    constructor(collection) {
        this.collection = collection;
    }
    
    async get(id) {
        if (id === undefined) {
            return await this.collection.find({});
        } else {
            return await this.collection.findById(id);
        }
    }
    async create(data) {
        return await new this.collection(data).save()
    }
    async update(id, data) {
        return await this.collection.udapteOne({ _id: id }, { $set: data })
    }
    async delete(id) {
        return await this.collection.deleteOne({ _id: id })
    }
}