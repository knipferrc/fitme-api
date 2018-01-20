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

  async getById(id) {
    const doc = await this.collection.findOne(ObjectId(id))
    return this._formatId(doc)
  }

  getCountByFilter(fields) {
    return this.collection.find(fields).count()
  }

  async getByFilter(fields) {
    const doc = await this.collection.find(fields)
    return this._formatId(doc)
  }

  _formatId(doc) {
    const id = doc._id
    delete doc._id
    return { ...doc, id }
  }
}

module.exports = Mongo
