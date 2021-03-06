/**************************************************************************
*********************   MAIN file, Server and Router   ********************
**************************************************************************/

//For starting a server
var bodyParser = require('body-parser')
const express = require('express');
const app = express();
const http    = require("http");
const validator = require('validator');

//To be able to get the json format data in the post request
app.use(bodyParser.json());

//If the server is already running we do not not want to start another one.
if(!module.parent){
  app.listen(3000, function() {
    console.log('listening on 3000');
  });
}

//Global data having all the users.
//This may not be best practice but I wanted to keep it simple.
var data = { "users" : [] };
//This functions clears / resets the users
app.clearUsers = function(){
  data.users = [];
}

//Home page.
app.get('/', (req, res) => {
  res.send('Welcome to my first node.js app');
})

//Get users simply returns all the users in the system.
app.get('/users',function(req,res) {
  // console.log("Get: ",JSON.stringify(data));
  res.send(JSON.stringify(data));
});

//Post request adds the user on the server.
app.post('/user',function(req, res) {
  var user = req.body;
  // console.log("Post: ", user);
  //Error message can be drilled down to each field, with seperate checks,
  //But I wanted to keep the error message as simple as possible to
  //not give more information to hackers.
  if ( (user["firstName"] == undefined)
    || (user["lastName"] == undefined)
    || (user["email"] == undefined) )
  {
    res.status(400).send("One of the fields is missing.");
  }
  else
  {
    //Trimming the user fields to remove any white spaces
    var firstName = user["firstName"].trim();
    var lastName = user["lastName"].trim();
    var email = user["email"].trim();
    //Checking if fristName and lastName are empty
    if( (validator.isEmpty(firstName))
     || (validator.isEmpty(lastName)) ){
      res.status(400).send("Empty field.");
    }
    //Checking the validity of email
    else if (!validator.isEmail(email)) {
      res.status(400).send("Invalid email.");
    }
    else{
      //All good. Add the trimmed fields to the data.
      var trimmedUser = {
        "firstName" : firstName,
        "lastName" : lastName,
        "email" : email
      };
      data.users.push(trimmedUser);
      res.status(200).send("User Successfully added.");
    }
  }
});

module.exports = app;
