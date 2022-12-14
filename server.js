const express = require('express')
const app = express();
const MongoClient = require('mongodb').MongoClient
const dotenv = require('dotenv').config()
const PORT = process.env.PORT ?? 3000


//-------------------------
// Connect to MongoDB
let db,
  dbConnectionStr = process.env.DB_STRING,
  dbName = 'shopping-list'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
  .then(client => {
      console.log(`Connected to ${dbName} Database`)
      db = client.db(dbName)
  })


// -------------------------
// Setup Dependencies
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


// -------------------------
// GET / Read
app.get('/', (req, res) => {
  db.collection('list-items').find().toArray() //find ALL documents in the list-items collection, and put them in an array
    .then(allItems => { //the above array of everything in list-items gets passed through to this ".then" via the "allItems" variable
        db.collection('list-items').countDocuments({completed: false}) //count the number of incomplete items in the db
        .then(itemsLeft => { //and pass the above result through to this ".then"
            res.render('index.ejs', { shoppingItems: allItems, remaining: itemsLeft }) //pass "allItems" (all of the objects that are inside the db) into the .ejs template, under the name "shoppingItems". whenever you see "shoppingItems" in ejs, that's our array of db items!
        })
    })
    .catch(error => console.error(error))
})


// -------------------------
// POST / Create
app.post('/addItem', (req, res) => {
  db.collection('list-items').insertOne({ groceryItem: req.body.groceryItem, completed: false })
    .then(result => {
      console.log('Grocery Item Added')
      res.redirect('/')
    })
    .catch(err => console.error(err))
})


// -------------------------
// DELETE / Delete
app.delete('/deleteItem', (req, res) => {
  db.collection('list-items').deleteOne({ groceryItem: req.body.groceryItemFromJS })
    .then(result => {
      console.log('Item Deleted');
      res.json('Item Deleted')
    })
    .catch(err => console.error(err))
})


// -------------------------
// Run Server
app.listen(PORT, _ => {
  console.log(`Server running on port ${PORT}`)
})