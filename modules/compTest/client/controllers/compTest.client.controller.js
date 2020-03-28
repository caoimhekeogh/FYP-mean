(function () {
  'use strict';

  angular
    .module('compTest')
    .controller('CompTestController', CompTestController);

  CompTestController.$inject = ['$scope', 'compTestResolve', 'Authentication'];

  function CompTestController($scope, compTest, Authentication) {
    var vm = this;

    vm.compTest = compTest;
    vm.authentication = Authentication;

  }
}());
