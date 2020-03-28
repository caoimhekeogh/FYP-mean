(function () {
  'use strict';

  angular
    .module('compTest')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Test',
      state: 'compTest',
      type: 'dropdown',
      roles: ['*']
    });
    menuService.addMenuItem('topbar', {
      title: 'About',
      state: 'compTest.list',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'compTest', {
      title: 'Faux Pas',
      state: 'compTest.doTest',
    //  state: 'compTest.create',
      roles: ['user']
    });
    menuService.addSubMenuItem('topbar', 'compTest', {
      title: 'Theory of Mind & Strange Stories',
      state: 'compTest.createToM',
    //  state: 'compTest.create',
      roles: ['user']
    });
    menuService.addSubMenuItem('topbar', 'compTest', {
      title: 'Facial Recognition',
      state: 'compTest.createfacialRecog',
  //    state: 'compTest.create',
      roles: ['user']
    });
  }
}());
