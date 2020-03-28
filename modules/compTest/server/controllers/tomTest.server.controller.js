'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  ToMTest = mongoose.model('ToMTest'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
* Create an ToM Test
*/

exports.createToM = function (req, res) {
  var tomTest = new ToMTest(req.body);
//  tomTest.provider = 'local';
  tomTest.user = req.user;

  tomTest.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(tomTest);
    }
  });
};
