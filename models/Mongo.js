const ObjectId = require('mongodb').ObjectId

class Mongo {
  constructor(db) {
    this.db = db
  }

  setCollection(collectionName) {
    this.collection = this.db.collection(collectionName)
  }

  createDoc(fields) {
    return this.collection.insertOne(fields)
  }

  async getById(id) {
    const doc = await this.collection.findOne(ObjectId(id))
    return doc ? this._formatId(doc) : null
  }

  async getDocByFilter(fields) {
    const doc = await this.collection.findOne(fields)
    return doc ? this._formatId(doc) : null
  }

  async updateDoc(fields) {
    const id = fields.id
    delete fields.id

    return this.collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: { ...fields }
      }
    )
  }

  getCountByFilter(fields) {
    return this.collection.find(fields).count()
  }

  _formatId(doc) {
    const id = doc._id
    delete doc._id
    return { ...doc, id }
  }
}

module.exports = Mongo
