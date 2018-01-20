const ObjectId = require('mongodb').ObjectId

class Mongo {
  constructor(db) {
    this.db = db
  }

  // set collection(collectionName) {
  //   console.log('COLLECTION NAME: ', collectionName)
  //   this.collection = this.db.collection(collectionName)
  // }

  setCollection(collectionName) {
    this.collection = this.db.collection(collectionName)
  }

  createDoc(fields) {
    return this.collection.insertOne(fields)
  }

  getById(id) {
    return this.collection.findOne(ObjectId(id))
  }

  getCountByFilter(fields) {
    return this.collection.find(fields).count()
  }

  getByFilter(fields) {
    return this.collection.find(fields)
  }
}

module.exports = Mongo
