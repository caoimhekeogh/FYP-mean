(function () {
  'use strict';

  angular
    .module('compTest.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.compTest', {
        abstract: true,
        url: '/compTest',
        template: '<ui-view/>'
      })
      .state('admin.compTest.list', {
        url: '',
        templateUrl: '/modules/compTest/client/views/admin/list-compTest.client.view.html',
        controller: 'CompTestAdminListController',
        controllerAs: 'vm',
      //  data: {
      //    roles: ['admin']
    //    }
      })
      .state('admin.compTest.create', {
        url: '/create',
        templateUrl: '/modules/compTest/client/views/admin/form-compTest.client.view.html',
        controller: 'CompTestAdminController',
        controllerAs: 'vm',
    //    data: {
    //      roles: ['admin']
    //    },
        resolve: {
        compTestResolve: newCompTest
        }
      })
      .state('admin.compTest.edit', {
        url: 'compTest/:compTestId/edit',
        templateUrl: '/modules/compTest/client/views/admin/form-compTest.client.view.html',
        controller: 'CompTestAdminController',
        controllerAs: 'vm',
        data: {
        //  roles: ['admin'],
          pageTitle: '{{ compTestResolve.title }}'
        },
        resolve: {
          compTestResolve: getCompTest
        }
      });
  }

getUser.$inject = ['$stateParams', 'CompTestService'];

  function getCompTest($stateParams, CompTestService) {
    return CompTestService.get({
      compTestId: $stateParams.compTestId
    }).$promise;
  }

  newCompTest.$inject = ['CompTestService'];

  function newCompTest(CompTestService) {
    return new CompTestService();
  }
}());
