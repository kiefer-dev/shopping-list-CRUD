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