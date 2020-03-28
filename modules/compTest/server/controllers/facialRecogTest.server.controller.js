'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  FRTest = mongoose.model('FRTest'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
* Create an Facial Recognition Test
*/

exports.createfacialRecog = function (req, res) {
  var facialRecogTest = new FRTest(req.body);
//  facialRecogTest.provider = 'local';
  facialRecogTest.user = req.user;

  facialRecogTest.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(facialRecogTest);
    }
  });
};
