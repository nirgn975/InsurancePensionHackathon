process.env.NODE_ENV = 'testing';

const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const chalk = require('chalk');

const server = require('../../server');

const should = chai.should();

chai.use(chaiHttp);

describe(chalk.blue('Graph'), () => {
  const user = {
    id: '200979136',
    password: '123',
  };

  before((done) => {
    // Empty all the collection.
    Object.keys(mongoose.connection.collections).forEach((collectionName) => {
      mongoose.connection.collections[collectionName].remove();
    });

    done();
  });

  it('should POST a new user', (done) => {
    chai.request(server)
      .post('/api/user')
      .send(user)
      .end((error, res) => {
        res.should.have.status(200);
        res.body.should.have.property('token');
        user.token = res.body.token;
        done();
      });
  });

  it('should GET all stock graph', (done) => {
    chai.request(server)
      .get('/api/graph/stock')
      .set({ access_token: user.token })
      .end((error, res) => {
        res.should.have.status(200);
        res.body.length.should.equal(100);
        res.body[0].should.have.property('id');
        res.body[0].should.have.property('name');
        res.body[0].should.have.property('avg');
        res.body[0].should.have.property('min');
        res.body[0].should.have.property('max');
        done();
      });
  });
});
