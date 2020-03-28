'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  path = require('path'),
  config = require(path.resolve('./config/config')),
  chalk = require('chalk');

  /**
   * FPTest Schema
   */
/*  var FPTestSchema = new Schema({

  });
  //CompTestSchema.statics.seed = seed;
  mongoose.model('FPTest', FPTestSchema);
*/

  /**
   * ToMTest Schema
*/
/*
  var ToMTestSchema = new Schema({

  });
  //CompTestSchema.statics.seed = seed;
  mongoose.model('ToMTest', ToMTestSchema);


  /**
*/
/*
  var FRTestSchema = new Schema({

  });
  mongoose.model('FRTest', FRTestSchema);
*/

/**
 * compTest Schema
 */
var CompTestSchema = new Schema({
  detQFPSS1: {
    type: String,
    default: '',
    trim: true,
    required: 'Checkbox cannot be blank'
  },
  idQFPSS1: {
    type: String,
    default: '',
    trim: true
  },
/*  compQFPSS1: {
    type: String,
    default: '',
    trim: true,
    required: 'Checkbox cannot be blank'
  },
  fbQFPSS1: {
    type: String,
    default: '',
    trim: true,
    required: 'Checkbox cannot be blank'
  }, */
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});


/**
 * Hook a pre save method

CompTestSchema.pre('save', function (next) {
*-    console.log(this.detQFPSS1);
    console.log(this.idQFPSS1);
    next();
}); */

CompTestSchema.statics.seed = seed;
mongoose.model('CompTest', CompTestSchema);

/**
 Seeds the CompTest collection with document (CompTest)
 and provided options.
*/

function seed(doc, options) {
  var CompTest = mongoose.model('CompTest');

return new Promise(function (resolve, reject) {

  skipDocument()
    .then(findUser)
    .then(add)
    .then(function (response) {
      return resolve(response);
    })
    .catch(function (err) {
      return reject(err);
    });

  function findUser(skip) {
    var User = mongoose.model('User');

    return new Promise(function (resolve, reject) {
      if (skip) {
        return resolve(true);
      }

      User
        .findOne({
          roles: { $in: ['user'] }
        })
        .exec(function (err, user) {
          if (err) {
            return reject(err);
          }

          doc.user = user;

          return resolve();
        });
    });
  }

  function add(skip) {
    return new Promise(function (resolve, reject) {

      var compTest = new CompTest(doc);

      compTest.save(function (err) {
        if (err) {
          return reject(err);
        }

        return resolve({
          message: 'Database Seeding: Test for\t' + user.username + ' added'
        });
      });
    });
  }
});
}
