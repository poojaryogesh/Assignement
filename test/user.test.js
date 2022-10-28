// Import the dependencies for testing
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');


chai.use(chaiHttp);
chai.should();

const chalk = require('chalk');
const expect = chai.expect;



describe('Get the user data', function () {
  it('Should get the reponse from API Gateway with status 200', function (done) {
    chai
     .request(app)
     .get('/users')
    
     .send({})
     .end(function(_err, res) {
       expect(res).to.have.status(200);
       console.log(chalk.bgCyan.bold(" API Response "), res.body);
       done();
     })
   });

   it('Should get the reponse from API Gateway with status 404', function (done) {
    chai
     .request(app)
     .get('/user')
    
     .send({})
     .end(function(_err, res) {
       expect(res).to.have.status(404);
       console.log(chalk.bgCyan.bold(" API Response "), res.body);
       done();
     })
   });

});

describe('store the user data', function () {
  it('Should get the reponse from API Gateway with status 200', function (done) {
    chai
     .request(app)
     .post('/users')
    
     .send({"name":"soujanya"})
     .end(function(_err, res) {
       expect(res).to.have.status(200);
       console.log(chalk.bgCyan.bold(" API Response "), res.body);
       done();
     })
   });

  //  it('Should get the reponse from API Gateway with status 500', function (done) {
  //   chai
  //    .request(app)
  //    .post('/users')
    
  //    .send(null)
  //    .end(function(_err, res) {
  //      expect(res).to.have.status(500);
  //      console.log(chalk.bgCyan.bold(" API Response "), res.body);
  //      done();
  //    })
  //  });

});

describe('update the user data', function () {
  it('Should get the reponse from API Gateway with status 200', function (done) {
    chai
     .request(app)
     .put('/users')
    
     .send({})
     .end(function(_err, res) {
       expect(res).to.have.status(200);
       console.log(chalk.bgCyan.bold(" API Response "), res.body);
       done();
     })
   });

   it('Should get the reponse from API Gateway with status 404', function (done) {
    chai
     .request(app)
     .get('/update')
    
     .send({})
     .end(function(_err, res) {
       expect(res).to.have.status(404);
       console.log(chalk.bgCyan.bold(" API Response "), res.body);
       done();
     })
   });

});

describe('find the user data', function () {
  it('Should get the reponse from API Gateway with status 200', function (done) {
    chai
     .request(app)
     .get('/user/:name')
    
     .send({})
     .end(function(_err, res) {
       expect(res).to.have.status(200);
       console.log(chalk.bgCyan.bold(" API Response "), res.body);
       done();
     })
   });

   it('Should get the reponse from API Gateway with status 404', function (done) {
    chai
     .request(app)
     .get('/find/user')
    
     .send({})
     .end(function(_err, res) {
       expect(res).to.have.status(404);
       console.log(chalk.bgCyan.bold(" API Response "), res.body);
       done();
     })
   });

});

describe('delete the user data', function () {
  it('Should get the reponse from API Gateway with status 200', function (done) {
    chai
     .request(app)
     .delete('/users')
    
     .send({_id:"6342f4ab118ed10029af4e7f"})
     .end(function(_err, res) {
       expect(res).to.have.status(200);
       console.log(chalk.bgCyan.bold(" API Response "), res.body);
       done();
     })
   });

   it('Should get the reponse from API Gateway with status 404', function (done) {
    chai
     .request(app)
     .get('/user')
    
     .send({})
     .end(function(_err, res) {
       expect(res).to.have.status(404);
       console.log(chalk.bgCyan.bold(" API Response "), res.body);
       done();
     })
   });

   it('Should get the reponse from API Gateway with status 500', function (done) {
    chai
     .request(app)
     .delete('/user/:name')
    
     .send({name:null})
     .end(function(_err, res) {
       expect(res).to.have.status(500);
       console.log(chalk.bgCyan.bold(" API Response "), res.body);
       done();
     })
   });

});



