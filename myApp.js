let express = require ('express');
let app = express();
require('dotenv').config()
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

console.log ("Hello World");

app.post("/name", function(req, res) {
  
    var string = req.body.first + " " + req.body.last;
    res.json({ name: string });
  });

app.get("/", function(req, res) {
    res.send("Hello Express");
  });
  app.get("/", function(req, res) {
    res.sendFile(__dirname + "/public/index.html");
  });


  app.use("/public", express.static(__dirname + "/public"));

  app.get("/json", (req, res) => {
    res.json({
      message: "Hello json"
    });
  });

  var response = "Hello World".toUpperCase(); 
  if (process.env.VAR_NAME === "allCaps") {
    response = "Hello World".toUpperCase();
  } else {
    response = "Hello World";
  }

  app.use(function middleware(req, res, next) {
  
    next();
  });

  const middleware = (req, res, next) => {
    req.time = new Date().toString();
    next();
  };
  
  app.get("/now", middleware, (req, res) => {
    res.send({
      time: req.time
    });
  });

  app.get("/:word/echo", (req, res) => {
    const { word } = req.params;
    res.json({
      echo: word
    });
  });

  app.get("/name", function(req, res) {
    var firstName = req.query.first;
    var lastName = req.query.last;
  
    var { first: firstName, last: lastName } = req.query;
    
    res.json({
      name: `${firstName} ${lastName}`
    });
  });




module.exports = app;