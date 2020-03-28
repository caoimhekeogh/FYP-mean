'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  CompTest = mongoose.model('CompTest'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  compTest;

/**
 * compTest routes tests
 */
describe('Competency Test Admin CRUD tests', function () {
  before(function (done) {
    // Get application
    app = express.init(mongoose.connection.db);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      usernameOrEmail: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      roles: ['user', 'admin'],
      username: credentials.usernameOrEmail,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new compTest
    user.save()
      .then(function () {
        compTest = {
          title: 'Test taking',
          content: 'Test answers'
        };

        done();
      })
      .catch(done);
  });

  it('should be able to save a compTest if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new compTest
        agent.post('/api/compTest')
          .send(compTest)
          .expect(200)
          .end(function (compTestSaveErr, compTestSaveRes) {
            // Handle compTest save error
            if (compTestSaveErr) {
              return done(compTestSaveErr);
            }

            // Get a list of compTest
            agent.get('/api/compTest')
              .end(function (compTestGetErr, compTestGetRes) {
                // Handle compTest save error
                if (compTestGetErr) {
                  return done(compTestGetErr);
                }

                // Get compTest list
                var compTest = compTestGetRes.body;

                // Set assertions
                (compTest[0].user._id).should.equal(userId);
                (compTest[0].title).should.match('Test taking');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to update a compTest if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new compTest
        agent.post('/api/compTest')
          .send(compTest)
          .expect(200)
          .end(function (compTestSaveErr, compTestSaveRes) {
            // Handle compTest save error
            if (compTestSaveErr) {
              return done(compTestSaveErr);
            }

            // Update compTest title
            compTest.title = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing compTest
            agent.put('/api/compTests/' + compTestSaveRes.body._id)
              .send(compTest)
              .expect(200)
              .end(function (compTestUpdateErr, compTestUpdateRes) {
                // Handle compTest update error
                if (compTestUpdateErr) {
                  return done(compTestUpdateErr);
                }

                // Set assertions
                (compTestUpdateRes.body._id).should.equal(compTestSaveRes.body._id);
                (compTestUpdateRes.body.title).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save a compTest if no title is provided', function (done) {
    // Invalidate title field
    compTest.title = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new compTest
        agent.post('/api/compTest')
          .send(compTest)
          .expect(422)
          .end(function (compTestSaveErr, compTestSaveRes) {
            // Set message assertion
            (compTestSaveRes.body.message).should.match('Title cannot be blank');

            // Handle compTest save error
            done(compTestSaveErr);
          });
      });
  });

  it('should be able to delete a compTest if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new compTest
        agent.post('/api/compTest')
          .send(compTest)
          .expect(200)
          .end(function (compTestSaveErr, compTestSaveRes) {
            // Handle compTest save error
            if (compTestSaveErr) {
              return done(compTestSaveErr);
            }

            // Delete an existing compTest
            agent.delete('/api/compTest/' + compTestSaveRes.body._id)
              .send(compTest)
              .expect(200)
              .end(function (compTestDeleteErr, compTestDeleteRes) {
                // Handle compTest error error
                if (compTestDeleteErr) {
                  return done(compTestDeleteErr);
                }

                // Set assertions
                (compTestDeleteRes.body._id).should.equal(compTestSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a single compTest if signed in and verify the custom "isCurrentUserOwner" field is set to "true"', function (done) {
    // Create new compTest model instance
    compTest.user = user;
    var compTestObj = new CompTest(compTest);

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new compTest
        agent.post('/api/compTest')
          .send(compTest)
          .expect(200)
          .end(function (compTestSaveErr, compTestSaveRes) {
            // Handle compTest save error
            if (compTestSaveErr) {
              return done(compTestSaveErr);
            }

            // Get the compTest
            agent.get('/api/compTest/' + compTestSaveRes.body._id)
              .expect(200)
              .end(function (compTestInfoErr, compTestInfoRes) {
                // Handle compTest error
                if (compTestInfoErr) {
                  return done(compTestInfoErr);
                }

                // Set assertions
                (compTestInfoRes.body._id).should.equal(compTestSaveRes.body._id);
                (compTestInfoRes.body.title).should.equal(compTest.title);

                // Assert that the "isCurrentUserOwner" field is set to true since the current User created it
                (compTestInfoRes.body.isCurrentUserOwner).should.equal(true);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  afterEach(function (done) {
    CompTest.remove().exec()
      .then(User.remove().exec())
      .then(done())
      .catch(done);
  });
});
