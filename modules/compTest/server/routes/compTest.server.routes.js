'use strict';

/**
 * Module dependencies
 */
var compTestPolicy = require('../policies/compTest.server.policy'),
  compTest = require('../controllers/compTest.server.controller');

module.exports = function (app) {
  // compTest collection routes
  app.route('/api/compTest').all(compTestPolicy.isAllowed)
  //  .get(compTest.list)
    .post(compTest.create)
  //  .post(compTest.createFauxPas)
  //  .post(compTest.createToM)
  //  .post(compTest.createfacialRecog);

  // Single compTest routes
  app.route('/api/compTest/:compTestId').all(compTestPolicy.isAllowed)
  //  .get(compTest.read)
  //  .put(compTest.update)
  //  .delete(compTest.delete);

  //app.route('/api/compTest/fauxPas').post(compTest.compTest);

  // Finish by binding the compTest middleware
  app.param('compTestId', compTest.compTestByID);

};
