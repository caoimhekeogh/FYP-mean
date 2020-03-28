(function () {
  'use strict';

  angular
    .module('compTest.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('compTest', {
        abstract: true,
        url: '/compTest',
        template: '<ui-view/>'
      })
      .state('compTest.list', {
        url: '/aboutTests',
        templateUrl: '/modules/compTest/client/views/list-compTest.client.view.html',
        controller: 'CompTestListController',
        controllerAs: 'vm'
      })
      .state('compTest.create', {
    //  .state('compTest.doTest', {
        url: '/fauxPas',
        templateUrl: '/modules/compTest/client/views/form-fauxPas-compTest.client.view.html',
        controller: 'CompTestListController',
        controllerAs: 'vm',
  //      resolve: {
  //      compTestResolve: newCompTest
//      },
        data: {
          roles: ['user']
        }
        })
    //   .state('compTest.create', {
      .state('compTest.createToM', {
        url: '/ToM',
        templateUrl: '/modules/compTest/client/views/form-ToM-compTest.client.view.html',
        controller: 'CompTestListController',
        controllerAs: 'vm',
//        resolve: {
//          compTestResolve: newToMTest
      //  tomTestResolve: newToMTest
//      },
        data: {
          roles: ['user']
        }
      })
  //   .state('compTest.create', {
     .state('compTest.createfacialRecog', {
        url: '/facialRecog',
        templateUrl: '/modules/compTest/client/views/form-facialRecog-compTest.client.view.html',
        controller: 'CompTestListController',
        controllerAs: 'vm',
    //    resolve: {
    //    compTestResolve: newFRTest
        //facialRecogTestResolve: newFRTest
  //    },
        data: {
          roles: ['user']
        }
      })

      .state('compTest.view', {
        url: '/:compTestId',
        templateUrl: '/modules/compTest/cient/views/view-compTest.client.view.html',
        controller: 'CompTestController',
        controllerAs: 'vm',
        resolve: {
          compTestResolve: getCompTest
        },
        data: {
          pageTitle: '{{ compTestResolve.title }}'
        }
      });
  }

  getCompTest.$inject = ['$stateParams', 'CompTestService'];

  function getCompTest($stateParams, CompTestService) {
    return CompTestService.get({
      compTestId: $stateParams.compTestId
    }).$promise;
  }
/*
  newCompTest.$inject = ['CompTestService'];
  function newCompTest(CompTestService) {
    return new CompTestService();
  }
/*
  newToMTest.$inject = ['CompTestService'];
  function newToMTest(CompTestService) {
    return new CompTestService();
  }

  newFRTest.$inject = ['CompTestService'];
  function newFRTest(CompTestService) {
    return new CompTestService();
  }
  */
}());
