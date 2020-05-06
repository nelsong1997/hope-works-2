const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017';
const moment = require('moment');
const client = new MongoClient(url);
const ObjectId = require('mongodb').ObjectId;

module.exports = class DataStore {
  constructor(dbUrl) {
    this.dbUrl = dbUrl;
    this.dbClient = null;
    this.dbName = 'hw';
  }
  async findUser(email) { // find user by email
    let collection = await this.collection()
    return collection.find({user: email});
  }

  async client() {
    if (this.dbClient && this.dbClient.isConnected()) {
      return this.dbClient;
    } else {
      // http://mongodb.github.io/node-mongodb-native/3.1/api/MongoClient.html
      console.log(`Connecting to ${this.dbUrl}...`)
      this.dbClient = await MongoClient.connect(this.dbUrl, { useNewUrlParser: true })
      console.log("Connected to database.");
      return this.dbClient;
    }
  }

  async collection() {
    const client = await this.client();
    const db = client.db(this.dbName);
    const collection = db.collection('hw');
    return collection;
  }

  async all() {
    let collection = await this.collection()
    return collection.find({}).sort([['when', 1]]);
  }

  async printAll() {
    let cursor = await this.all();
   }

  printEntry(fact, currentDay) {
  }

  async addForm(data) {
    let entry = {
      when: new Date(),
      data: data
    };

    let collection = await this.collection()
    let result = await collection.insertOne(entry)
    assert.equal(1, result.insertedCount); // sanity check
    console.log('Inserted fact as id ' + result.insertedId)

    return {id: result.insertedId};
  }

  async deleteForm(id) {
    let collection = await this.collection()
    const objectId = new ObjectId(id)
    let query = {_id: objectId}
    collection.remove(query)
 }
}