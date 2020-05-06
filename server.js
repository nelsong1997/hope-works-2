const express = require('express');
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')
const app = express();
const assert = require('assert');
const DataStore = require('./database/hw_list')
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/';
const store = new DataStore('mongodb+srv://HOPEworksAdmin:HOPEworks1337@hopeworks-data-asjmw.mongodb.net/test?retryWrites=true&w=majority');

MongoClient.connect('mongodb+srv://HOPEworksAdmin:HOPEworks1337@hopeworks-data-asjmw.mongodb.net/test?retryWrites=true&w=majority',
  { useUnifiedTopology: true }, (err) => {
  if (err) return console.log(err)
  console.log('connected to mongo')
})

app.get('/smooby', function (req, res) {
  res.send('texty')
})

app.get('/forms', getAll);

app.get('/delete/:id', deleteForm)

async function deleteForm(request, response) {
  let id = request.params.id
  let result = await store.deleteForm(id)
  console.log(result)
  response.redirect("/view-forms")
}

async function getAll(request, response) {
  let cursor = await store.all();
  let output = [];
  cursor.forEach((entry) => {
    output.push(entry);
  }, function (err) {
    assert.equal(null, err);
    console.log("Sending " + output.length + " records to client");
    response.type('application/json')
      .send(JSON.stringify(output))
  });
}

app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'ejs')

app.post('/form', express.json(), (req, res) => {
  addData(req, res)
})

async function addData(request, response) {
  let result = await store.addForm(request.body)
  let output = {
    status: 'ok',
    id: result.id
  }
  response
    .type('application/json')
    .send(JSON.stringify(output))
}

app.post('/login', (req, res) => {
  console.log(req.body)
});

app.listen(5000, function () {
  console.log('listening on 5000')
});