npm init
npm install express --save
npm install mongodb --save
npm install ejs --save
npm install dotenv --save
npm install nodemon --save-dev
  add <"dev": "nodemon server.js"> to scripts in package.json



config.env
  create config folder and config.env in it
    DB_STRING = [db connection string from mongodb]
    PORT = [whatever port you want]
  add config and node_modules to .gitignore