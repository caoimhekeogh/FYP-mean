(function (app) {
  'use strict';

  app.registerModule('compTest', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('compTest.admin', ['core.admin']);
  app.registerModule('compTest.admin.routes', ['core.admin.routes']);
  app.registerModule('compTest.services');
  app.registerModule('compTest.routes', ['ui.router', 'core.routes', 'compTest.services']);
}(ApplicationConfiguration));
