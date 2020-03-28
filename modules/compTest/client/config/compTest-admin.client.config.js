(function () {
  'use strict';

  // Configuring the Competency Tests Admin module
  angular
    .module('compTest.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Tests',
      state: 'admin.compTest.list'
    });
  }
}());
