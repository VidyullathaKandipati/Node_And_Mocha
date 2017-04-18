
var expect = require("chai").expect;
var app = require("../app");
var chai = require('chai');
var chaiHttp = require("chai-http");

chai.use(chaiHttp);

describe("USER CRUD.", function() {

    // Checking for availability of the end point and empty list of users.
    it('should return empty array of users.',function(done){
      var expectedUsers = { "users": [] };
      //Clearing previous users.
      app.clearUsers();

      //Get request to get the users.
      chai.request(app)
      .get('/users')
      .end(function(err, res){
        expect(res.statusCode).to.equal(200);
        expect(res.text).to.equal(JSON.stringify(expectedUsers));
        done();
      });
    });

    //Adding to the list of users.
    it('should add the given user in the system.',function(done){
      var user = { "firstName": "Test", "lastName": "Last", "email": "email@email.com" };
      //Clearing previous users.
      app.clearUsers();

      //Post request to add user.
      chai.request(app)
      .post('/user')
      .send(user)
      .end(function(err, res){
        expect(res.status).to.equal(200);
        done();
      });
    });

    // Adding to the list of users with invalid parameters.
    it('should not add the given user in the system.',function(done){
      var user = { "lastName": "Last", "email": "email@email.com" };

      //Post request to add user.
      chai.request(app)
      .post('/user')
      .send(user)
      .end(function(err, res){
        expect(res.status).to.equal(400);
        done();
      });
    });

    // Adding to the list of users with invalid body format.
    it('should not add the given user in the system.',function(done){
      var user = '{ "firstName": "Test", "lastName": "Last", "email": "email@email.com" }';

      //Post request to add user.
      chai.request(app)
      .post('/user')
      .send(user)
      .end(function(err, res){
        expect(res.status).to.equal(400);
        done();
      });
    });

    //Checking for the list of users with data.
    it('should return array of users in the system.',function(done){
      var expectedUsers = { "users" : [{ "firstName": "Test", "lastName": "Last", "email": "email@email.com"}] };

      //Get request to get users.
      chai.request(app)
      .get('/users')
      .end(function(err, res){
        expect(res.text).to.equal(JSON.stringify(expectedUsers));
        done();
      });
    });

});
