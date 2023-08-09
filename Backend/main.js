const express = require("express");
const app = express();
const path = require("path");
const mysql = require("mysql2");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const Router = require("./router"); // Correct case for filename

app.use(express.static(path.join(__dirname, "build"))); //tells express to serve our static build
app.use(express.json()); //tells app to push json back and forth

// console.log('Testing Server') //quick log to test server capable of running with npm start

const db = mysql.createConnection({
  //need to pull this out into a .env file
  host: "localhost",
  user: "root",
  password: "MyN3wP4ssw0rd",
  database: "myapp",
});

db.connect(function (err) {
  if (err) {
    console.log("DB error");
    throw err;
    return false; //stops code from executing if there is an error
  }
});

const sessionStore = new MySQLStore(
  {
    expiration: 1825 * 86400 * 1000, //sets a timer on a session. This is in milliseconds so ends up around 5 years for end of session
    endConnectionOnClose: false, // sets session to expire on close
  },
  db
);

app.use(
  session({
    //pass in some config options here
    key: "aslkdhglakshdglkhs", //set to something random
    secret: "aldkahsdlkhgaslkhdgalshdglkh",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1825 * 86400 * 1000,
      httpOnly: false,
    },
  })
);

new Router(app, db) //pulls in app and db allowing us to scale app better 

//server from front end
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(3000)
