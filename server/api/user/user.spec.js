process.env.NODE_ENV = 'testing';

const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const chalk = require('chalk');
const _ = require('lodash');

const server = require('../../server');

const should = chai.should();

chai.use(chaiHttp);

describe(chalk.blue('User'), () => {
  const user = {
    id: '200979136',
    password: '123',
    passwordConfirmation: '123',
    cardNumber: '1234-1234-1234-1234',
    cvv: '789',
    expMonth: '4',
    expYear: '2021',
  };

  const user2 = {
    id: '200979136',
    password: '123',
    passwordConfirmation: '1234',
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

  it('should not POST a new user', (done) => {
    chai.request(server)
      .post('/api/user')
      .send(user2)
      .end((error, res) => {
        res.should.have.status(406);
        done();
      });
  });

  it('should GET user info', (done) => {
    chai.request(server)
      .get('/api/user/me')
      .set('access_token', user.token)
      .end((error, res) => {
        res.should.have.status(200);
        res.body.should.have.property('_id');
        res.body.should.have.property('id').equal(user.id);

        // Save the user info
        _.merge(user, res.body);
        done();
      });
  });

  it('should PUT a user', (done) => {
    user.id = '200979135';

    chai.request(server)
      .put(`/api/user/${user._id}`)
      .set('access_token', user.token)
      .send(user)
      .end((error, res) => {
        res.should.have.status(200);
        res.body.should.have.property('_message').equal('User successfully updated!');
        res.body.user.should.have.property('_id').equal(user._id);
        res.body.user.should.have.property('id').equal(user.id);
        done();
      });
  });
});
