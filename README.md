npm init
npm install express --save
npm install mongodb --save
npm install ejs --save
npm install dotenv --save
npm install nodemon --save-dev
  add <"dev": "nodemon server.js"> to scripts in package.json



.env
  create .env file
    DB_STRING = [db connection string from mongodb]
    PORT = [whatever port you want]
  add .env and node_modules to .gitignore



Basic Server Setup:
  //MongoDB connection
    let db,
      dbConnectionStr = process.env.DB_STRING,
      dbName = 'shopping-list'

    MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
      .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
      })


  //Setup dependencies
    app.set('view engine', 'ejs')
    app.use(express.static('public'))
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())


  //Run server
    app.listen(PORT, _ => {
      console.log(`Server running on port ${PORT}`)
    })
  
  The above should make the server functional now.