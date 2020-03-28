'use strict';

/**
 * Module dependencies
 */
var _ = require('lodash'),
  path = require('path'),
  mongoose = require('mongoose'),
  CompTest = mongoose.model('CompTest'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));
/*  multer = require('multer'),
  multerS3 = require('multer-s3'),
  aws = require('aws-sdk'),
  amazonS3URI = require('amazon-s3-uri');


  var useS3Storage = config.uploads.storage === 's3' && config.aws.s3;
  var s3;

  if (useS3Storage) {
    aws.config.update({
      accessKeyId: config.aws.s3.accessKeyId,
      secretAccessKey: config.aws.s3.secretAccessKey
    });

    s3 = new aws.S3();
  }
*/
/**
 * Create an compTest
 */
exports.create = function (req, res) {
//exports.doTest = function (req, res) {
  var compTest = new CompTest(req.body);
//  var compTest = req.model;
//  compTest.provider = 'local';
  compTest.user = req.user;
//    compTest.created = Date.now();
//    compTest.detQFPSS1 = req.body.detQFPSS1;
//    compTest.idQFPSS1 = req.body.idQFPSS1;

  compTest.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
      res.json(compTest);

  });
};


/**
 * Send User

exports.me = function (req, res) {
-  // Sanitize the user - short term solution. Copied from core.server.controller.js
-  // TODO create proper passport mock: See https://gist.github.com/mweibel/5219403
  var safeTestObject = null;
  if (req.compTest) {
-    safeTestObject = {
-      created: req.user.created.toString(),
      idQFPSS1: validator.escape(req.compTest.idQFPSS1),
      detQFPSS1: validator.escape(req.compTest.detQFPSS1)
    };
  }

-  res.json(safeTestObject || null);
};
*/



/**
*  Show the current compTest

exports.read = function (req, res) {
-  res.json(req.model);
};
*/
/**
 *- Update an compTest

*- exports.update = function (req, res) {
*-  var compTest = req.compTest;

*-  compTest.title = req.body.title;
*-  compTest.content = req.body.content;

*-  compTest.save(function (err) {
*-    if (err) {
*-      return res.status(422).send({
*-        message: errorHandler.getErrorMessage(err)
      });
*-    } *- else {
*-      res.json(compTest);
    }
  });
};

/**
 *- Delete an compTest

*- exports.delete = function (req, res) {
*-  var compTest = req.compTest;

*-  compTest.remove(function (err) {
*-    if (err) {
*-      return res.status(422).send({
*-        message: errorHandler.getErrorMessage(err)
      });
*-    } *- else {
*-      res.json(compTest);
    }
  });
};

/**
*= List of compTest

exports.list = function (req, res) {
-  var compTest = new CompTest(req.body);
-  //  compTest.provider = 'local';
-  compTest.user = req.user;
};
*/
/**
 * compTest middleware
 */
exports.compTestByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Test is invalid'
    });
  }

  CompTest.findById(id).exec(function (err, article) {
    if (err) {
      return next(err);
    } else if (!compTest) {
      return res.status(404).send({
        message: 'No test with that identifier has been found'
      });
    }
    req.compTest = compTest;
    next();
  });
};
