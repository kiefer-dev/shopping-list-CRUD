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
// Run Server
app.listen(PORT, _ => {
  console.log(`Server running on port ${PORT}`)
})